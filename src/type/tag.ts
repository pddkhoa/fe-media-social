import { User } from "./user";

export type Tag = {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    user: User;
};
