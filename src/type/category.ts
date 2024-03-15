import { Tag } from "./tag";
import { Avatar, User } from "./user";

export type Category = {
  avatar: Avatar;
  banner: Avatar;
  _id: string;
  name: string;
  description: string;
  type: string;
  isAdmin: User | string;
  users: User[];
  tags: Tag[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sumUser: number;
};
