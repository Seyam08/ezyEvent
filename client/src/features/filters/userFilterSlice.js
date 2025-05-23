import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userStatus: "users",
};

const userFilterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    userFilterStatus: (state, action) => {
      state.userStatus = action.payload;
    },
  },
});

export default userFilterSlice.reducer;
export const { userFilterStatus } = userFilterSlice.actions;
