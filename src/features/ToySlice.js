import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const toysAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = toysAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToys: builder.query({
      query: () => "/toys",
      transformResponse: (responseData) => {
        const loadedToys = responseData.map((toy) => {
          if (!toy?.reactions)
            toy.reactions = {
              heart: 0,
            };
          return toy;
        });
        return toysAdapter.setAll(initialState, loadedToys);
      },
      providesTags: (result, error, arg) => [
        { type: "Toys", id: "LIST" },
        ...result.ids.map((id) => ({ type: "toys", id })),
      ],
    }),
    getToysByToysId: builder.query({
      query: (id) => `/toys/?toyId=${id}`,
      transformResponse: (responseData) => {
        const loadedToys = responseData.map((toy) => {
          if (!toy?.reactions)
            toy.reactions = {
              heart: 0,
            };
          return toy;
        });
        return toysAdapter.setAll(initialState, loadedToys);
      },
      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "toy", id })),
      ],
    }),
    addNewPost: builder.mutation({
      query: (initialToy) => ({
        url: "/toys",
        method: "POST",
        body: {
          ...initialToy,
          Id: Number(initialToy.toyId),
          reactions: {
            heart: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "toy", id: "LIST" }],
    }),
    updateToy: builder.mutation({
      query: (initialToy) => ({
        url: `/toys/${initialToy.id}`,
        method: "PUT",
        body: {
          ...initialToy,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "toy", id: arg.id }],
    }),
    deleteToy: builder.mutation({
      query: ({ id }) => ({
        url: `/toys/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "toy", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ toysId, reactions }) => ({
        url: `toys/${toysId}`,
        method: "PATCH",

        body: { reactions },
      }),
      async onQueryStarted(
        { toysId, reactions },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getToys",
            "getToys",
            (draft) => {
              const toy = draft.entities[toysId];
              if (toy) toy.reactions = reactions;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
export const toysReducer = toysAdapter.reducer;
export const {
  useGetToysQuery,
  useGetToysByToysIdQuery,
  useAddNewToyMutation,
  useUpdateToyMutation,
  useDeleteMutation,
  useAddReactionMutation,
} = extendedApiSlice;
