import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEvents: null,
  upcoming: null,
  ongoing: null,
  completed: null,
};

const eventSlice = createSlice({
  name: "AllEvents",
  initialState,
  reducers: {
    getAllEvents: (state, actions) => {
      if (actions?.payload?.events) {
        // If the payload contains a users object, update the state with those events
        const events = actions.payload.events;
        const upcomingEvents = events.filter(
          (event) => event.status === "Upcoming"
        );
        const ongoingEvents = events.filter(
          (event) => event.status === "Ongoing"
        );
        const completedEvents = events.filter(
          (event) => event.status === "Completed"
        );

        state.allEvents = events;
        state.upcoming = upcomingEvents;
        state.ongoing = ongoingEvents;
        state.completed = completedEvents;
      } else {
        // If no events or error, reset the state
        state.allEvents = null;
        state.upcoming = null;
      }
    },
  },
});

export const { getAllEvents, filterEventsByStatus } = eventSlice.actions;
const allEventsSliceReducer = eventSlice.reducer;
export default allEventsSliceReducer;
