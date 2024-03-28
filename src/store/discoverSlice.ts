import { Post } from "@/type/post";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const discoverSlice = createSlice({
    name: "discover",
    initialState: {
        listPostLastest: [] as Post[],
        listPostPopular: [] as Post[],
        listPostBestDis: [] as Post[],
        listPostFeed: [] as Post[],
        pendingComment: false,
    },
    reducers: {
        getBlogLastestFirst: (state, action) => {
            state.listPostLastest = action.payload;
        },
        getMoreBlogLastest: (state, action) => {
            state.listPostLastest.push(...action.payload);
        },
        getBlogPopularFirst: (state, action) => {
            state.listPostPopular = action.payload;
        },
        getMoreBlogPopular: (state, action) => {
            state.listPostPopular.push(...action.payload);
        },
        getBlogDisFirst: (state, action) => {
            state.listPostBestDis = action.payload;
        },
        getMoreBlogDis: (state, action) => {
            state.listPostBestDis.push(...action.payload);
        },
        likePostLastest: (state, action) => {
            const post: any = state.listPostLastest.find(
                (post) => post._id === action.payload
            );

            if (post && post.isLiked) {
                post.isLiked = false;
                post.likes = post.likes - 1;
            } else {
                post.isLiked = true;
                post.likes = post.likes + 1;
            }
        },
        savePostLastest: (state, action) => {
            const post: any = state.listPostLastest.find(
                (post) => post._id === action.payload
            );

            if (post && post.isSave) {
                post.isSave = false;
            } else {
                post.isSave = true;
            }
        },
        likePostDiscuss: (state, action) => {
            const post: any = state.listPostBestDis.find(
                (post) => post._id === action.payload
            );

            if (post && post.isLiked) {
                post.isLiked = false;
                post.likes = post.likes - 1;
            } else {
                post.isLiked = true;
                post.likes = post.likes + 1;
            }
        },
        savePostDiscuss: (state, action) => {
            const post: any = state.listPostBestDis.find(
                (post) => post._id === action.payload
            );

            if (post && post.isSave) {
                post.isSave = false;
            } else {
                post.isSave = true;
            }
        },
        likePostPopular: (state, action) => {
            const post: any = state.listPostPopular.find(
                (post) => post._id === action.payload
            );

            if (post && post.isLiked) {
                post.isLiked = false;
                post.likes = post.likes - 1;
            } else {
                post.isLiked = true;
                post.likes = post.likes + 1;
            }
        },
        savePostPopular: (state, action) => {
            const post: any = state.listPostPopular.find(
                (post) => post._id === action.payload
            );

            if (post && post.isSave) {
                post.isSave = false;
            } else {
                post.isSave = true;
            }
        },

        postCommentToPostLastest: (
            state,
            action: PayloadAction<{ postId: string; comment: any }>
        ) => {
            const { postId, comment } = action.payload;
            const post = state.listPostLastest.find(
                (post) => post._id === postId
            );
            state.pendingComment = true;

            if (post) {
                post.comments.push(comment);
                post.sumComment = post.sumComment + 1;
            }
        },
        postCommentToPostPopular: (
            state,
            action: PayloadAction<{ postId: string; comment: any }>
        ) => {
            const { postId, comment } = action.payload;
            const post = state.listPostPopular.find(
                (post) => post._id === postId
            );
            state.pendingComment = true;

            if (post) {
                post.comments.push(comment);
                post.sumComment = post.sumComment + 1;
            }
        },
        postCommentToPostDis: (
            state,
            action: PayloadAction<{ postId: string; comment: any }>
        ) => {
            const { postId, comment } = action.payload;
            const post = state.listPostBestDis.find(
                (post) => post._id === postId
            );
            state.pendingComment = true;

            if (post) {
                post.comments.push(comment);
                post.sumComment = post.sumComment + 1;
            }
        },
    },
});

export const {
    getBlogLastestFirst,
    getMoreBlogLastest,
    savePostPopular,
    likePostPopular,
    likePostDiscuss,
    savePostDiscuss,
    likePostLastest,
    savePostLastest,
    getBlogDisFirst,
    getBlogPopularFirst,
    getMoreBlogDis,
    getMoreBlogPopular,
    postCommentToPostDis,
    postCommentToPostLastest,
    postCommentToPostPopular,
} = discoverSlice.actions;

export default discoverSlice.reducer;
