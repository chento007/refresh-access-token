import { apiSlice } from "@/store/api/apiSlice";

export const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: () => `/accounts/me/`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["History"], // provideTags are used for updating cache
    }),
  }),
});

// auto generated hooks for getUser query (GET)
export const { useGetHistoryQuery } = historyApiSlice;
