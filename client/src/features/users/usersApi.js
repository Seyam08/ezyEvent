import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      async onQueryStarted() {},
    }),
    getUser: builder.query({
      query: (username) => ({
        url: `/users/${username}`,
      }),
      async onQueryStarted() {},
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery } = usersApi;
