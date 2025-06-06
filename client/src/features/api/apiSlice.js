import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
    credentials: "include",
  }),
  tagTypes: ["singleEvent", "myProfile"],
  endpoints: () => ({}),
});
