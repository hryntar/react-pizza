import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Визначте типи для вашого стану
interface PizzaState {
  pizzas: any[]; // Замініть "any" на тип вашої піци
  status: "loading" | "success" | "error";
}

const initialState: PizzaState = {
  pizzas: [],
  status: "loading",
};

// Визначте типи для вашої асинхронної дії
interface FetchPizzasArgs {
  activeCategory: number; // Замініть "any" на тип вашої активної категорії
  currPage: number;
  tagIdx: {name: string, sortProp: string}; // Замініть "any" на тип вашого tagIdx
}

export const fetchPizzas = createAsyncThunk<any, FetchPizzasArgs>(
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.pizzas = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
      });
  },
});

// export const {  } = pizzasSlice.actions;

export default pizzasSlice.reducer;
