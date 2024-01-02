import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   activeCategory: 0,
   tagIdx: {
      name: "популярності",
      sortProp: "rating",
   },
};

const filterSlice = createSlice({
   name: "filter",
   initialState,
   reducers: {
      setActiveCategory(state, action) {
         state.activeCategory = action.payload;
      },
      setTagIdx(state, action) {
         state.tagIdx = action.payload;
      },
   },
});

export const { setActiveCategory, setTagIdx } = filterSlice.actions;

export default filterSlice.reducer;
