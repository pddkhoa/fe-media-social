import { Category } from "@/type/category";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [] as Category[],
        myCategories: [] as Category[],
    },
    reducers: {
        getAllCategories: (state, payload) => {
            state.categories = payload.payload;
        },
        getCategoriesByUser: (state, payload) => {
            state.myCategories = payload.payload;
        },
    },
});

export const { getAllCategories, getCategoriesByUser } = categorySlice.actions;

export default categorySlice.reducer;
