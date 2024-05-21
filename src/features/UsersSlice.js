// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// const usersAdapter = createEntityAdapter();
// const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        const loadedUsers = responseData;
        return loadedUsers;
      },
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
      onQueryStarted: (_, { dispatch, getState }) => {
        dispatch(usersApiSlice.util.updateData("getUsers", []));
      },
    }),
    addUserRents: builder.mutation({
      query: ({ userId, rentId }) => ({
        url: `/users/${userId}/rents`,
        method: "PATCH",
        body: { rentId },
      }),
      invalidatesTags: [{ type: "User", id: "userId" }],
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

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useLogOutMutation,
  useAddUserRentsMutation,
  // useUpdateUserRentsMutation,
  // useGetUserRentsQuery,
} = usersApiSlice;
