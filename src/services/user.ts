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
}

export default UserServices;
