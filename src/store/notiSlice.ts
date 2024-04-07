import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
    name: "noti",
    initialState: {
        loadingPage: false,
    },
    reducers: {
        startLoadingPage: (state) => {
            state.loadingPage = true;
        },
        pendingLoadingPage: (state) => {
            state.loadingPage = false;
        },
        endLoadingPage: (state) => {
            state.loadingPage = false;
        },
    },
});

export const { startLoadingPage, pendingLoadingPage, endLoadingPage } =
    notiSlice.actions;

export default notiSlice.reducer;
