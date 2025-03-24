import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
  speakers: null,
  hosts: null,
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    getAllUsers: (state, actions) => {
      if (actions?.payload?.users) {
        // If the payload contains a users object, update the state with those users
        const users = actions.payload.users;
        const speakersWithEvents = users.filter(
          (user) =>
            user.role.includes("speaker") &&
            Array.isArray(user.eventsSpeaking) &&
            user.eventsSpeaking.length > 0
        );
        const hostsWithEvents = users.filter(
          (user) =>
            user.role.includes("host") &&
            Array.isArray(user.eventsHosted) &&
            user.eventsHosted.length > 0
        );

        state.allUsers = users;
        state.speakers = speakersWithEvents;
        state.hosts = hostsWithEvents;
      } else {
        // If no profile or error, reset the state
        state.allUsers = null;
        state.speakers = null;
        state.hosts = null;
      }
    },
  },
});

export const { getAllUsers } = allUsersSlice.actions;
const allUsersSliceReducer = allUsersSlice.reducer;
export default allUsersSliceReducer;
