import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials, setCurrentUser } from "../features/auth/authSlice";
import { getRefresh,getDecryptedRefresh } from "@/lib/cryptography";

// create base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access;
    headers.set("content-type", "application/json");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // Attempt to get a new access token using the refresh token
    const refresh = await getDecryptedRefresh();
    if (refresh) {
      try {
        // Try refreshing the token
        const refreshResult = await baseQuery(
          {
            url: '/accounts/token/refresh/',
            method: 'POST',
            body: { refresh },
          },
          api,
          extraOptions
        );
        // Check if the refresh was successful
        if (refreshResult?.data) {
          // Dispatch the new credentials to the store
          api.dispatch(setCredentials(refreshResult.data));
          // Retry the original query with the new access token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refreshing the token failed, log out the user
          api.dispatch(logout());
          // Consider using a more user-friendly notification system than alert
          console.error("Session expired. Please log in again. 1");
        }
      } catch (error) {
        console.error("Failed to refresh access token", error);
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
      console.error("Session expired. Please log in again. 2");
    }
  }
  return result;
};

// create api slice with custom base query
export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"], // tagTypes are used for cache invalidation
  endpoints: (builder) => ({}),
});
