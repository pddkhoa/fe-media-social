import { User } from "./user";

export interface Comment {
    _id: string;
    replies: Comment[];
    createdAt: string;
    updatedAt: string;
    content: string;
    user: User;
    replyToCommentId: string | null;
    __v: number;
}
