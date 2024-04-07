import identity from "@/api/interceptor";
import { NotificationType } from "@/type/notification";
import { Post } from "@/type/post";
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

    static async reportUser(data: {
        userId: string | undefined;
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
            identity.post(`user/reportUser`, data)
        );
    }
    static async reportPost(data: {
        blogId: string | undefined;
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
            identity.post(`user/reportBlog`, data)
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
    static async getNotificationByType(type: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: NotificationType[];
        };
        return await requestApiHelper<body>(
            identity.get(`user/listNotifyByType/${type}`)
        );
    }

    static async sharePost(idPost: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            identity.post(`user/shareBlog/${idPost}`)
        );
    }
}

export default UserServices;
