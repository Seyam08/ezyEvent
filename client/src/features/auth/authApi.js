import { SignJWT } from "jose";
import toast from "react-hot-toast";
import { loginErrorHandler } from "../../helper/login/loginResErrorHandler";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["myProfile"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // Await the result of the query
          const result = await queryFulfilled;
          if (result?.data) {
            // Extract the profile from the result
            const profile = result?.data?.profile;

            try {
              // Convert the secret key to Uint8Array

              const secretKey = new TextEncoder().encode(
                import.meta.env.VITE_JWT_SECRET
              );
              // const secretKey = import.meta.env.VITE_JWT_SECRET;

              // Get the expiration time from environment variables
              const expirationTime = import.meta.env.VITE_JWT_EXP;
              // Generate JWT token inline
              const token = await new SignJWT(profile)
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime(expirationTime)
                .sign(secretKey);

              // Store the token in localStorage
              localStorage.setItem("auth", token);
            } catch (error) {
              // Dispatch an action to update the state with an error message, if there is an error while generating the token
              dispatch(
                userLoggedIn({ error: "Something went wrong! Unable to login" })
              );
              // Dispatch the logout mutation to ensure the user is logged out, is there is an error while generating the token
              dispatch(authApi.endpoints.logout.initiate());
              toast.error("Something went wrong! Unable to login");
            }
            // Dispatch the userLoggedIn action with the profile
            dispatch(
              userLoggedIn({
                profile: result?.data?.profile,
              })
            );
          }
        } catch (error) {
          const extractError = loginErrorHandler(error?.error);

          toast.error(extractError?.message);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
      }),
      invalidatesTags: ["myProfile"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // Await the result of the query
          const result = await queryFulfilled;
          // Dispatch the userLoggedOut action if the logout is successful
          if (result?.data) {
            dispatch(userLoggedOut());
          }
        } catch (error) {
          // Handle any errors that occur during the logout process
          const errorData = loginErrorHandler(error.error);

          if (errorData.message === "Unauthorized URL!") {
            // Remove the token from localStorage if the URL is unauthorized
            localStorage.removeItem("auth");
          }
          // Dispatch the userLoggedOut action with an error message if the logout fails
          dispatch(userLoggedOut({ error: errorData }));
          toast.error(errorData?.message);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
