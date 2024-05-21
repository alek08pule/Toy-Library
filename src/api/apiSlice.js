import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["toys", "users", "rents"],
  endpoints: (builder) => ({
    getToys: builder.query({
      query: () => "/toys",
      providesTags: ["toys"],
    }),

    getRents: builder.query({
      query: () => "/rents",
      providesTags: ["rents"],
    }),

    addRent: builder.mutation({
      query: (newRent) => ({
        url: "/rents",
        method: "POST",
        body: newRent,
      }),
      invalidatesTags: ["rents"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["users"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    updateUserRents: builder.mutation({
      query: ({ userId, updatedRents }) => ({
        url: `/users/${userId}/userRents`,
        method: "PUT",
        body: { userRents: updatedRents },
      }),
      invalidatesTags: [{ type: "User", id: "userId" }],
    }),
    getUserRents: builder.query({
      query: (userId) => `/users/${userId}/userRents`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
  }),
});
