import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  profile: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, actions) => {
      if (actions?.payload?.profile) {
        // If the payload contains a profile, update the state with the profile
        const profile = actions.payload.profile;

        state.isAuthenticated = true;
        state.profile = profile;
        state.error = null;
      } else if (actions?.payload?.error) {
        // If the payload contains an error, update the state with the error
        state.error = actions.payload.error;
      } else {
        // If no profile or error, reset the authentication state
        state.isAuthenticated = false;
        state.profile = null;
      }
    },
    userLoggedOut: (state, actions) => {
      if (actions?.payload?.error) {
        // If the payload contains an error, update the state with the error
        state.error = actions.payload.error;
      } else {
        // If no error, remove the auth token from localStorage and reset the state
        localStorage.removeItem("auth");
        state.isAuthenticated = false;
        state.profile = null;
      }
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
