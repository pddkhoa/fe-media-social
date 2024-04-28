import { ChatNoti, NotificationType } from "@/type/notification";
import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
    name: "noti",
    initialState: {
        loadingPage: false,
        listNotification: [] as NotificationType[],
        listNotificationMess: [] as ChatNoti[],
        addNoti: false,
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

        getListNotification: (state, action) => {
            state.listNotification = action.payload;
        },

        readNotification: (state, action) => {
            const noti: NotificationType | any = state.listNotification.find(
                (noti) => noti._id === action.payload
            );

            if (noti && noti.isRead === false) {
                noti.isRead = true;
            }
        },
        startAddNoti: (state) => {
            state.addNoti = true;
        },
        endAddNoti: (state) => {
            state.addNoti = false;
        },

        getListNotificationMess: (state, action) => {
            state.listNotificationMess = action.payload;
        },

        readNotificationMess: (state, action) => {
            const noti: ChatNoti | any = state.listNotificationMess.find(
                (noti) => noti._id === action.payload
            );

            if (noti && noti.isRead === false) {
                noti.isRead = true;
            }
        },
    },
});

export const {
    startLoadingPage,
    pendingLoadingPage,
    endLoadingPage,
    getListNotification,
    readNotification,
    startAddNoti,
    endAddNoti,
    getListNotificationMess,
    readNotificationMess,
} = notiSlice.actions;

export default notiSlice.reducer;
