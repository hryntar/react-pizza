import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItemType } from "./cartSlice";

interface PizzaState {
   pizzas: CartItemType[];
   status: "loading" | "success" | "error";
}

const initialState: PizzaState = {
   pizzas: [],
   status: "loading",
};
interface FetchPizzasArgs {
   activeCategory: number;
   currPage: number;
   tagIdx: { name: string; sortProp: string }; // Замініть "any" на тип вашого tagIdx
}

export const fetchPizzas = createAsyncThunk<CartItemType[], FetchPizzasArgs>(
   "pizza/fetchPizzasStatus",
   async ({ activeCategory, currPage, tagIdx }) => {
      const { data } = await axios.get<CartItemType[]>(
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
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = "loading";
         })
         .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<CartItemType[]>) => {
            state.pizzas = action.payload;
            state.status = "success";
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = "error";
         });
   },
}); 

export default pizzasSlice.reducer;
