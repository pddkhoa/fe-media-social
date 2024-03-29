import { UserWall } from "@/type/wall";
import { createSlice } from "@reduxjs/toolkit";

const wallSlice = createSlice({
    name: "wall",
    initialState: {
        listUserFollower: [] as UserWall[],
        listUserFollowing: [] as UserWall[],
        pendingFollow: false,
    },
    reducers: {
        getListFollower: (state, action) => {
            state.listUserFollower = action.payload;
        },
        getListFollowing: (state, action) => {
            state.listUserFollowing = action.payload;
        },
        followUserFollower: (state, action) => {
            const user: UserWall | any = state.listUserFollower.find(
                (user) => user._id === action.payload
            );

            if (user && user.isfollow) {
                user.isfollow = false;
                user.totalFollower = user.totalFollower - 1;
            } else {
                user.isfollow = true;
                user.totalFollower = user.totalFollower + 1;
            }
        },
        followUserFollowing: (state, action) => {
            const user: UserWall | any = state.listUserFollowing.find(
                (user) => user._id === action.payload
            );

            if (user && user.isfollow) {
                user.isfollow = false;
                user.totalFollowing = user.totalFollowing - 1;
            } else {
                user.isfollow = true;
                user.totalFollowing = user.totalFollowing + 1;
            }
        },
        pendingFollowingSuccess: (state) => {
            state.pendingFollow = true;
        },
        doneFollowingSuccess: (state) => {
            state.pendingFollow = false;
        },
    },
});

export const {
    getListFollower,
    getListFollowing,
    followUserFollower,
    followUserFollowing,
    pendingFollowingSuccess,
    doneFollowingSuccess,
} = wallSlice.actions;

export default wallSlice.reducer;
