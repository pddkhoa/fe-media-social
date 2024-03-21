import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
    name: "image",
    initialState: {
        isUpload: false,
    },
    reducers: {
        pendingUpload: (state) => {
            state.isUpload = true;
        },
        uploadSuccess: (state) => {
            state.isUpload = false;
        },
    },
});

export const { pendingUpload, uploadSuccess } = imageSlice.actions;

export default imageSlice.reducer;
