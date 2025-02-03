import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import allEventsSliceReducer from "../features/Events/eventSlice";
import myAccountSliceReducer from "../features/Profile/profileSlice";
import allUsersSliceReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    account: myAccountSliceReducer,
    users: allUsersSliceReducer,
    events: allEventsSliceReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
