import { Post } from "@/type/post";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        listPostByUser: [] as Post[],
        listPostBookmark: [] as Post[],
        listPostDraft: [] as Post[],
        listPostLastest: [] as Post[],
        listPostPopular: [] as Post[],
        listPostBestDis: [] as Post[],
        listPostFeed: [] as Post[],
        pendingComment: false,
        postDetail: {} as Post,
    },
    reducers: {
        getPostByUser: (state, action) => {
            state.listPostByUser = action.payload;
        },
        getPostBookmark: (state, action) => {
            state.listPostBookmark = action.payload;
        },
        getPostDraft: (state, action) => {
            state.listPostDraft = action.payload;
        },
        getPostFeed: (state, action) => {
            state.listPostFeed = action.payload;
        },
        getLoadmorePostFeed: (state, action) => {
            state.listPostFeed.push(...action.payload);
        },
        likePostByUserSuccess: (state, action) => {
            const post: any = state.listPostByUser.find(
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
        likePostFeedSuccess: (state, action) => {
            const post: any = state.listPostFeed.find(
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
        savePostByUserSuccess: (state, action) => {
            const post: any = state.listPostByUser.find(
                (post) => post._id === action.payload
            );

            if (post && post.isSave) {
                post.isSave = false;
            } else {
                post.isSave = true;
            }
        },
        likePostBookmarkSuccess: (state, action) => {
            const post: any = state.listPostBookmark.find(
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
        savePostBookmarkSuccess: (state, action) => {
            const post: any = state.listPostBookmark.find(
                (post) => post._id === action.payload
            );

            if (post && post.isSave) {
                post.isSave = false;
            } else {
                post.isSave = true;
            }
        },
        likePostDraftSuccess: (state, action) => {
            const post: any = state.listPostDraft.find(
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
        savePostDraftSuccess: (state, action) => {
            const post: any = state.listPostDraft.find(
                (post) => post._id === action.payload
            );

            if (post && post.isSave) {
                post.isSave = false;
            } else {
                post.isSave = true;
            }
        },
        savePostFeedSuccess: (state, action) => {
            const post: any = state.listPostFeed.find(
                (post) => post._id === action.payload
            );

            if (post && post.isSave) {
                post.isSave = false;
            } else {
                post.isSave = true;
            }
        },
        postCommentToPostByUser: (
            state,
            action: PayloadAction<{ postId: string; comment: any }>
        ) => {
            const { postId, comment } = action.payload;
            const post = state.listPostByUser.find(
                (post) => post._id === postId
            );
            state.pendingComment = true;

            if (post) {
                post.comments.push(comment);
                post.sumComment = post.sumComment + 1;
            }
        },
        postCommentToPostBookmark: (
            state,
            action: PayloadAction<{ postId: string; comment: any }>
        ) => {
            const { postId, comment } = action.payload;
            const post = state.listPostBookmark.find(
                (post) => post._id === postId
            );
            state.pendingComment = true;

            if (post) {
                post.comments.push(comment);
                post.sumComment = post.sumComment + 1;
            }
        },
        postCommentToPostFeed: (
            state,
            action: PayloadAction<{ postId: string; comment: any }>
        ) => {
            const { postId, comment } = action.payload;
            const post = state.listPostFeed.find((post) => post._id === postId);
            state.pendingComment = true;

            if (post) {
                post.comments.push(comment);
                post.sumComment = post.sumComment + 1;
            }
        },
        pendingCommentSuccess: (state) => {
            state.pendingComment = true;
        },
        doneCommentSuccess: (state) => {
            state.pendingComment = false;
        },
        getPostDetail: (state, action) => {
            state.postDetail = action.payload;
        },
        addCommentToPostDetail: (
            state,
            action: PayloadAction<{ postId: string; comment: any }>
        ) => {
            const { comment } = action.payload;
            state.postDetail.comments.push(comment);
            state.postDetail.sumComment += 1;
        },
        deleteCommentToPostDetail: (state, action) => {
            const { postId, commentId } = action.payload;

            if (state.postDetail._id === postId) {
                state.postDetail.comments = state.postDetail.comments.filter(
                    (comment) => comment._id !== commentId
                );
                state.postDetail.sumComment -= 1;
            }
        },
    },
});

export const {
    getPostByUser,
    getPostBookmark,
    getPostDraft,
    likePostByUserSuccess,
    savePostByUserSuccess,
    likePostBookmarkSuccess,
    savePostBookmarkSuccess,
    likePostDraftSuccess,
    savePostDraftSuccess,
    postCommentToPostBookmark,
    postCommentToPostByUser,
    pendingCommentSuccess,
    doneCommentSuccess,
    getPostDetail,
    addCommentToPostDetail,
    deleteCommentToPostDetail,
    getPostFeed,
    likePostFeedSuccess,
    savePostFeedSuccess,
    postCommentToPostFeed,
    getLoadmorePostFeed,
} = postSlice.actions;

export default postSlice.reducer;
