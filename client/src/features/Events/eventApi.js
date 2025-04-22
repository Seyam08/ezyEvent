import { apiSlice } from "../api/apiSlice";
import { getAllEvents } from "./eventSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => "/events",
      providesTags: ["AllEvent"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.events) {
            dispatch(
              getAllEvents({
                events: result?.data?.events,
              })
            );
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      },
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
    addEvent: builder.mutation({
      query: (data) => ({
        url: `/events`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllEvent"],
    }),
    editEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/event/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["singleEvent"],
    }),
    editEventSpeakers: builder.mutation({
      query: ({ id, data }) => ({
        url: `/event/editspeaker/${id}`,
        method: "PATCH",
        body: data,
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
  useAddEventMutation,
  useEditEventMutation,
  useEditEventSpeakersMutation,
} = profileApi;
