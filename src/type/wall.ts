export interface UserWall {
    avatar: {
        publicId: string;
        url: string;
    };
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    roles: string;
    phone: string;
    gender: string;
    second_name: string;
    status: string;
    loginAttempts: number;
    address: null | string; // Can be null or a string
    totalFollower: number;
    totalFollowing: number;
    totalBlog: number;
    totalSeries: number;
    createDate: string; // Date string, adjust to Date type if needed
    updateDate: string; // Date string, adjust to Date type if needed
    createdAt: string; // Date string, adjust to Date type if needed
    updatedAt: string; // Date string, adjust to Date type if needed
    __v: number;
    isfollow: boolean;
}
