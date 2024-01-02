import cartSlice from "./slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
   reducer: {
      filterSlice,
      cartSlice,
      pizzasSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>