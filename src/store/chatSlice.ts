import { ChatType, MessageType } from "@/type/chat";
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        getListChat: [] as ChatType[],
        getListChatRequest: [] as ChatType[],

        getChatMessages: [] as MessageType[],
        newMessages: {} as MessageType,
    },
    reducers: {
        getListChatSuccess: (state, action) => {
            state.getListChat = action.payload;
        },
        getListChatRequestSuccess: (state, action) => {
            state.getListChatRequest = action.payload;
        },
        getListChatMessagesSuccess: (state, action) => {
            state.getChatMessages = action.payload;
        },
        sendMessagesSuccess: (state, action) => {
            state.newMessages = action.payload;
            state.getChatMessages = [
                ...state.getChatMessages,
                state.newMessages,
            ];
        },
        startChatMessagesSuccess: (state, action) => {
            const newChat = action.payload;
            state.getListChat.unshift(newChat);
        },
        deleteListChatSuccess: (state, action) => {
            const chatIdToDelete = action.payload;
            state.getListChat = state.getListChat.filter(
                (chat) => chat._id !== chatIdToDelete
            );
        },
        readMessage: (state, action) => {
            const chat: any = state.getListChat.find(
                (chat) => chat._id === action.payload
            );

            if (chat && chat.isRead === false) {
                chat.isRead = true;
            }
        },
    },
});

export const {
    getListChatSuccess,
    getListChatMessagesSuccess,
    sendMessagesSuccess,
    startChatMessagesSuccess,
    deleteListChatSuccess,
    getListChatRequestSuccess,
    readMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
