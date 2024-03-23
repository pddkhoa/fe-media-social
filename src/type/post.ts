import { Tag } from "./tag";
import { Avatar, User } from "./user";

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
    tags: Tag[];
    listUserLikes: string[];
    savedBy: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type CategoryPost = {
    _id: string;
    name: string;
    status: "Private" | "Publish"; // Assuming status can be either Private or Public
    isAdmin: string; // Assuming this is the ID of the admin user
    users: string[]; // Assuming this is an array of user IDs
    tags: string[]; // Assuming these are tags associated with the group
    sumUser: number;
    createdAt: Date;
    updatedAt: Date;
    invitationCode: string;
    __v: number;
    statusUser: "Join" | "Leave"; // Assuming statusUser can be either Join or Leave
    avatar: Avatar;
};
