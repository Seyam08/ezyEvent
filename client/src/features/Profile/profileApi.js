import toast from "react-hot-toast";
import { apiSlice } from "../api/apiSlice";
import { userLoggedOut } from "../auth/authSlice";
import { accountInfo } from "./profileSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
      }),
      providesTags: ["myProfile"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              accountInfo({
                profile: result?.data?.profile,
              })
            );
          }
        } catch (error) {
          toast.error("Something went wrong!");
          dispatch(userLoggedOut());
        }
      },
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = profileApi;
