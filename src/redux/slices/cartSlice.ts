import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 

export type CartItemType = {
   id: number;
   title: string;
   price: number;
   imageUrl: string;
   type: string;
   size: number;
   count: number;
   types: number[];
   sizes: number[]
} ;
interface CartType {
   totalPrice: number;
   items: CartItemType[];
}

const initialState: CartType = {
   totalPrice: 0,
   items: [],
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<CartItemType>) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);
         if (findItem) {
            findItem.count++;
            state.totalPrice += findItem.price;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
            state.totalPrice += action.payload.price;
         }
      },
      removeItem(state, action: PayloadAction<number>) {
         const findItem = state.items.find((item) => item.id === action.payload);
         if (findItem) {
            state.totalPrice -= findItem.price;
            state.items = state.items.filter((obj) => obj.id !== action.payload);
         }
      },
      clearItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
      minusItem(state, action: PayloadAction<number>) {
         const findItem = state.items.find((item) => item.id === action.payload); 
         if (findItem && findItem.count !== 1) {
            findItem.count--;
            state.totalPrice -= findItem.price;
         }
      },
   },
});

export const selectCart = (state: { cartSlice: CartType }) => state.cartSlice; // селектор для cart

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
