import { Category } from "./category";
import { Post } from "./post";
import { User } from "./user";

export type NotificationType = {
    _id: string;
    sender: User;
    recipient: User;
    blog: Post;
    category: Category | null;
    type: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
