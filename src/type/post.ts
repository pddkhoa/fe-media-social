import { Comment } from "./comment";
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
    category: {
        avatar: Avatar;
        _id: string;
        name: string;
        description: string;
        status: string;
        isAdmin: string;
        users: string[];
        banner: string;
        tags: string[];
        sumUser: number;
        createdAt: string;
        updatedAt: string;
        invitationCode: string;
        __v: number;
    };
    tags: {
        _id: string;
        name: string;
        sumBlog: number;
        user: User;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }[];
    listUserLikes: any[]; // Kiểu này cần xác định chính xác nếu bạn có thông tin về người dùng
    savedBy: any[]; // Kiểu này cần xác định chính xác nếu bạn có thông tin về người dùng
    comments: Comment[]; // Kiểu này cần xác định chính xác nếu bạn có thông tin về bình luận
    createdAt: string;
    updatedAt: string;
    __v: number;
    isPermission: boolean;
    isApproved: boolean;
    isShare: boolean;
    shareBy: User;
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
    statusUser: "Join" | "UnJoin" | "Pending"; // Assuming statusUser can be either Join or Leave
    avatar: Avatar;
    isPermission: boolean;
};
