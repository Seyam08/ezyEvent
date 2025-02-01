import { apiSlice } from "../api/apiSlice";
import { getAllUsers } from "./userSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            dispatch(
              getAllUsers({
                users: result?.data,
              })
            );
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      },
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
