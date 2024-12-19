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
        const profile = actions.payload.profile;

        state.isAuthenticated = true;
        state.profile = profile;
      } else if (actions?.payload?.error) {
        state.error = actions.payload.error;
      } else {
        state.isAuthenticated = false;
        state.profile = null;
      }
    },
    userLoggedOut: (state, actions) => {
      if (actions?.payload?.error) {
        state.error = actions.payload.error;
      } else {
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
