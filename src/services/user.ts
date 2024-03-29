import identity from "@/api/interceptor";
import { UserWall } from "@/type/wall";
import { requestApiHelper } from "@/utils/apiRequest";

class UserServices {
    static async getWallDetail(id: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall;
        };
        return await requestApiHelper<body>(
            identity.get(`user/wallUser/${id}`)
        );
    }
    static async getListUserFollower(id: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall[];
        };
        return await requestApiHelper<body>(
            identity.get(`user/userFollower/${id}`)
        );
    }
    static async getListUserFollowing(id: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall[];
        };
        return await requestApiHelper<body>(
            identity.get(`user/userFollowing/${id}`)
        );
    }
    static async followUser(id: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall;
        };
        return await requestApiHelper<body>(identity.post(`user/follow/${id}`));
    }
}

export default UserServices;
