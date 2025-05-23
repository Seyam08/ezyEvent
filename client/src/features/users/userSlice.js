import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    getAllUsers: (state, actions) => {
      if (actions?.payload?.users) {
        // If the payload contains a users object, update the state with those users
        const users = actions.payload.users;
        state.allUsers = users;
      } else {
        // If no profile or error, reset the state
        state.allUsers = null;
      }
    },
  },
});

export const { getAllUsers } = allUsersSlice.actions;
const allUsersSliceReducer = allUsersSlice.reducer;
export default allUsersSliceReducer;
