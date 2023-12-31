import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
   pizzas: [],
   status: "loading",
};

export const fetchPizzas = createAsyncThunk(
   "pizza/fetchPizzasStatus",
   async ({ activeCategory, currPage, tagIdx }) => {
      const { data } = await axios.get(
         `https://654ce0fc77200d6ba8599ac9.mockapi.io/pizzas?page=${currPage}&limit=8&sortBy=${
            tagIdx.sortProp
         }&order=desc${activeCategory ? `&category=${activeCategory}` : ``}`
      );
      return data;
   }
);

const pizzasSlice = createSlice({
   name: "pizza",
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = "loading";
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.pizzas = action.payload;
            state.status = "success";
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = "error";
         });
   },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
