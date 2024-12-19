import { apiSlice } from "../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // if (result?.data) {
          //   dispatch(
          //     userLoggedIn({
          //       profile: result?.data?.profile,
          //     })
          //   );
          // }
        } catch {
          // do nothing
        }
      },
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
