import { User } from "./user";

export type Post = {
    _id: string;
    title: string;
    content: string;
    description: string;
    avatar: string;
    status: string;
    likes: number;
    views: number;
    sumComment: number;
    isSave: boolean;
    isLiked: boolean;
    user: User;
    category: null | string;
    tags: string[];
    listUserLikes: string[];
    savedBy: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};
