import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type tagIdxType = {
   name: string,
   sortProp: string,
}

interface filterSlice {
   activeCategory: number,
   tagIdx: tagIdxType,
}

const initialState: filterSlice = {
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
      setActiveCategory(state, action: PayloadAction<number>) {
         state.activeCategory = action.payload;
      },
      setTagIdx(state, action: PayloadAction<tagIdxType>) {
         state.tagIdx = action.payload;
      },
   },
});

export const { setActiveCategory, setTagIdx } = filterSlice.actions;

export default filterSlice.reducer;
