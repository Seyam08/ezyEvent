import { apiSlice } from "../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: (id) => ({
        url: `/event/${id}`,
      }),
      async onQueryStarted() {},
    }),
  }),
});

export const { useGetEventQuery } = profileApi;
