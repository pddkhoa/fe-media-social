import identity from "@/api/interceptor";
import { NotificationType } from "@/type/notification";
import { ReportType, UserReport } from "@/type/report";
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

    static async reportComment(data: {
        commentId: string;
        message: string;
        reason: string;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserReport;
        };
        return await requestApiHelper<body>(
            identity.post(`user/reportComment`, data)
        );
    }
    static async reportTags(data: {
        tagId: string;
        message: string;
        reason: string;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserReport;
        };
        return await requestApiHelper<body>(
            identity.post(`user/reportTag`, data)
        );
    }

    static async getNotification() {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: NotificationType[];
        };
        return await requestApiHelper<body>(identity.get(`user/listNotify`));
    }

    static async readNotification(idNoti: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: NotificationType;
        };
        return await requestApiHelper<body>(
            identity.post(`user/checkIsRead/${idNoti}`)
        );
    }
    static async getReportType() {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ReportType[];
        };
        return await requestApiHelper<body>(identity.get(`user/report`));
    }
}

export default UserServices;
