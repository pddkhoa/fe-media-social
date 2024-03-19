import { Tag } from "./tag";
import { Avatar, User } from "./user";

export type Category = {
    _id: string;
    avatar: Avatar;
    name: string;
    description: string;
    status: string;
    isAdmin: string;
    users: User[];
    banner: string;
    tags: Tag[];
    sumUser: number;
    createdAt: string;
    updatedAt: string;
    invitationCode: string;
    __v: number;
    statusUser: string;
};

export type CategoryDetail = {
    _id: string;
    avatar: Avatar;
    name: string;
    description: string;
    status: string;
    isAdmin: User;
    users: User[];
    banner: string;
    tags: Tag[];
    sumUser: number;
    createdAt: string;
    updatedAt: string;
    invitationCode: string;
    __v: number;
    statusUser: string;
};
