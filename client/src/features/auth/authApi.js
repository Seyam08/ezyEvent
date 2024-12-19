import { SignJWT } from "jose";
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            const profile = result?.data?.profile;

            const secretKey = new TextEncoder().encode(
              import.meta.env.VITE_JWT_SECRET
            );

            const expirationTime = import.meta.env.VITE_JWT_EXP;
            // Generate JWT token inline
            const token = await new SignJWT(profile)
              .setProtectedHeader({ alg: "HS256" })
              .setIssuedAt()
              .setExpirationTime(expirationTime)
              .sign(secretKey);

            localStorage.setItem("auth", token);

            dispatch(
              userLoggedIn({
                profile: result?.data?.profile,
              })
            );
          }
        } catch (error) {
          dispatch(
            userLoggedIn({ error: "Something went wrong! Unable to login" })
          );
          dispatch(authApi.endpoints.logout.initiate());
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(userLoggedOut());
          }
        } catch (error) {
          const errorData = loginErrorHandler(error.error);
          dispatch(userLoggedOut({ error: errorData }));
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
