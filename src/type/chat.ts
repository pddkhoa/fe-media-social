import { Avatar, User } from "./user";

export interface ChatType {
    avatar: Avatar;
    _id: string;
    createBy: User;
    admins: User[];
    listUser: User[];
    chatName: string | null;
    isGroup: boolean;
    listLastUser: User[];
    createdAt: string;
    updatedAt: string;
    userReceived: User;
    isWait: boolean;
    __v: number;
}

export interface MessageType {
    _id: string;
    user: User;
    message: string;
    chat: ChatType;
    userReceived: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
