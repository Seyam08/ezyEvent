import { createSlice } from "@reduxjs/toolkit";
import { userLoggedOut } from "../auth/authSlice";

const initialState = {
  myAccount: null,
};

const myAccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    accountInfo: (state, actions) => {
      if (actions?.payload?.profile) {
        // If the payload contains a profile, update the state with the profile
        const profile = actions.payload.profile;

        state.myAccount = profile;
      } else {
        // If no profile or error, reset the authentication state
        state.myAccount = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLoggedOut.type, (state, action) => {
      state.myAccount = null;
    });
  },
});

export const { accountInfo } = myAccountSlice.actions;
const myAccountSliceReducer = myAccountSlice.reducer;
export default myAccountSliceReducer;
