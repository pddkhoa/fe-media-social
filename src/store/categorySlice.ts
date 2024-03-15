import { Category } from "@/type/category";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "auth",
  initialState: {
    categories: [] as Category[],
  },
  reducers: {
    getAllCateogies: (state, payload) => {
      state.categories = payload.payload;
    },
    getCateogiesByUser: (state, payload) => {
      state.categories = payload.payload;
    },
  },
});

export const { getAllCateogies, getCateogiesByUser } = categorySlice.actions;

export default categorySlice.reducer;
