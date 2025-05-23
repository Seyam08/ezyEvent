import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventStatus: "All",
};

const eventFilterSlice = createSlice({
  name: "eventFilter",
  initialState,
  reducers: {
    eventFilterStatus: (state, action) => {
      state.eventStatus = action.payload;
    },
  },
});

export default eventFilterSlice.reducer;
export const { eventFilterStatus } = eventFilterSlice.actions;
