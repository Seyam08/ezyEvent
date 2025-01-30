import { apiSlice } from "../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => "/events",
      providesTags: ["AllEvent"],
      async onQueryStarted() {},
    }),
    getEvent: builder.query({
      query: (id) => ({
        url: `/event/${id}`,
      }),
      providesTags: ["singleEvent"],
      async onQueryStarted() {},
    }),
    attendEvent: builder.mutation({
      query: (id) => ({
        url: `/event/attend/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["singleEvent"],
    }),
    removeAttendance: builder.mutation({
      query: (id) => ({
        url: `/event/removeattend/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["singleEvent"],
    }),
  }),
});

export const {
  useGetEventQuery,
  useAttendEventMutation,
  useRemoveAttendanceMutation,
  useGetAllEventsQuery,
} = profileApi;
