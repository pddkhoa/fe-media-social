import { Comment } from "./comment";
import { Post } from "./post";
import { Tag } from "./tag";
import { User } from "./user";

export interface UserReport {
    userReport: User;
    comment: Comment;
    reason: string;
    _id: string;
    __v: number;
}
export interface SettingType {
    _id: string;
    value: string;
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    __v: number;
}
export interface ReportType {
    _id: string;
    value: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ReportBlogType {
    userReport: User;
    reason: ReportType;
    blogIsReported: Post;
    message: string;
    _id: string;
    __v: number;
}

export interface ReportTagType {
    userReport: User;
    reason: ReportType;
    tagIsReported: Tag;
    message: string;
    _id: string;
    __v: number;
}

export interface ReportCommentType {
    userReport: User;
    comment: Comment;
    reason: ReportType;
    message: string;
    _id: string;
    __v: number;
}

export interface ReportUserType {
    userReport: User;
    userIsReported: User;
    reason: ReportType;
    message: string;
    _id: string;
    __v: number;
}
