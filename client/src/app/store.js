import { configureStore } from "@reduxjs/toolkit";
import myAccountSliceReducer from "../features/account/profileSlice";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import allEventsSliceReducer from "../features/Events/eventSlice";
import eventFilterSliceReducer from "../features/filters/eventFilterSlice";
import userFilterSliceReducer from "../features/filters/userFilterSlice";
import allUsersSliceReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    account: myAccountSliceReducer,
    users: allUsersSliceReducer,
    events: allEventsSliceReducer,
    userFilter: userFilterSliceReducer,
    eventFilter: eventFilterSliceReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
