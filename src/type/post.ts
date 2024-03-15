import { User } from "./user";

export type Post = {
  _id: string;
  title: string;
  content: string;
  description: string;
  avatar: string;
  status: string;
  like: number;
  sumComment: number;
  user: User;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
