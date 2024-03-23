import { Category } from "@/type/category";
import { Post } from "@/type/post";
import { STATUS_USER_GROUP } from "@/utils/contants";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [] as Category[],
        myCategories: [] as Category[],
        blogOfCategories: [] as Post[],
    },
    reducers: {
        getAllCategories: (state, action) => {
            state.categories = action.payload;
        },
        getLoadmoreCategories: (state, action) => {
            state.categories.push(...action.payload);
        },
        getCategoriesByUser: (state, action) => {
            state.myCategories = action.payload;
        },
        getLoadmoreCategoriesByUser: (state, action) => {
            state.myCategories.push(...action.payload);
        },
        joinCategories: (state, action) => {
            const cate = state.categories.find(
                (post) => post._id === action.payload
            );

            if (cate) {
                cate.statusUser = STATUS_USER_GROUP.JOINED;
            }
        },
        leaveCategories: (state, action) => {
            const cate = state.categories.find(
                (post) => post._id === action.payload
            );

            if (cate) {
                cate.statusUser = STATUS_USER_GROUP.UNJOIN;
            }
        },
        pendingCategories: (state, action) => {
            const cate = state.categories.find(
                (post) => post._id === action.payload
            );

            if (cate) {
                cate.statusUser = STATUS_USER_GROUP.PENDING;
            }
        },
        cancelPendingCategories: (state, action) => {
            const cate = state.categories.find(
                (post) => post._id === action.payload
            );

            if (cate) {
                cate.statusUser = STATUS_USER_GROUP.UNJOIN;
            }
        },
        getAllBlogCategories: (state, action) => {
            state.blogOfCategories = action.payload;
        },
        getLoadmoreBlogCategories: (state, action) => {
            state.blogOfCategories.push(...action.payload);
        },
    },
});

export const {
    getAllCategories,
    getCategoriesByUser,
    joinCategories,
    leaveCategories,
    pendingCategories,
    cancelPendingCategories,
    getLoadmoreCategories,
    getLoadmoreCategoriesByUser,
    getAllBlogCategories,
    getLoadmoreBlogCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
