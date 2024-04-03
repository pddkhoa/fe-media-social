import { Comment } from "./comment";
import { User } from "./user";

export interface UserReport {
    userReport: User;
    comment: Comment;
    reason: string;
    _id: string;
    __v: number;
}
export interface ReportType {
    _id: string;
    value: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
