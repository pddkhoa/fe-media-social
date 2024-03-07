export interface Avatar {
  publicId: string;
  url: string;
}

export interface User {
  avatar: Avatar;
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  phone: string;
  gender: string;
  second_name: string;
  status: string;
  loginAttempts: number;
  address: string | null;
  totalFollower: number;
  totalFollowing: number;
  totalBlog: number;
  totalSeries: number;
  createDate: string;
  updateDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserToken {
  user: User;
  iat: number;
  exp: number;
}
