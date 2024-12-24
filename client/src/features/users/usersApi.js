import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      async onQueryStarted() {},
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
