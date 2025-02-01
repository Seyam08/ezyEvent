import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEvents: null,
  upcoming: null,
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

        state.allEvents = events;
        state.upcoming = upcomingEvents;
      } else {
        // If no events or error, reset the state
        state.allEvents = null;
        state.upcoming = null;
      }
    },
  },
});

export const { getAllEvents } = eventSlice.actions;
const allEventsSliceReducer = eventSlice.reducer;
export default allEventsSliceReducer;
