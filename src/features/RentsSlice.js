import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const rentsAdapter = createEntityAdapter();
const initialState = rentsAdapter.getInitialState();

export const rentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRents: builder.query({
      query: () => "/rents",
      transformResponse: (responseData) => {
        return rentsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Rent", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Rent", id })),
      ],
    }),
    addRent: builder.mutation({
      query: (rentData) => ({
        url: "/rents",
        method: "POST",
        body: rentData,
      }),
      invalidatesTags: [{ type: "Rent", id: "LIST" }],
    }),
  }),
});

export const { useGetRentsQuery, useAddRentMutation } = rentsApiSlice;
