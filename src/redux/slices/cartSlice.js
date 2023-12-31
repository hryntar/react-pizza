import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   totalPrice: 0,
   items: [],
}; 

const cartSlice = createSlice({
   name: "cart",
   initialState, 
   reducers: {
      // addItem(state, action) {
      //    state.items.push(action.payload);
      //    state.totalPrice += action.payload.price;
      // },
      addItem(state, action) {
         const findItem = state.items.find(obj => obj.id === action.payload.id);
         if (findItem) {
            findItem.count++;    
            state.totalPrice += findItem.price;
         } else {
            state.items.push({
               ...action.payload,
               count: 1
            }); 
            state.totalPrice += action.payload.price; 
         } 
         
      },
      removeItem(state, action) { 
         const findItem = state.items.find(item => item.id === action.payload);
         state.totalPrice -= findItem.price;
         state.items = state.items.filter((obj) => obj.id !== action.payload); 

      },
      clearItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
      minusItem(state,action) {
         const findItem = state.items.find(item => item.id === action.payload);
         if (findItem.count !== 1){
            findItem.count--;
            state.totalPrice -= findItem.price;
         }
      }
   },
});

export const selectCart = (state) => state.cartSlice; // селектор для cart

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
