import { NotificationType } from "@/type/notification";
import { Post } from "@/type/post";
import { ReportType, UserReport } from "@/type/report";
import { UserWall } from "@/type/wall";
import { requestApiHelper } from "@/utils/apiRequest";

class UserServices {
    static async getWallDetail(id: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall;
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`user/wallUser/${id}`)
        );
    }
    static async getListUserFollower(id: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`user/userFollower/${id}`)
        );
    }
    static async getListUserFollowing(id: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`user/userFollowing/${id}`)
        );
    }
    static async followUser(id: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserWall;
        };
        return await requestApiHelper<body>(axiosJWT.post(`user/follow/${id}`));
    }

    static async reportComment(
        data: {
            commentId: string;
            message: string;
            reason: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserReport;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`user/reportComment`, data)
        );
    }
    static async reportTags(
        data: {
            tagId: string;
            message: string;
            reason: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserReport;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`user/reportTag`, data)
        );
    }

    static async reportUser(
        data: {
            userId: string | undefined;
            message: string;
            reason: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserReport;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`user/reportUser`, data)
        );
    }
    static async reportPost(
        data: {
            blogId: string | undefined;
            message: string;
            reason: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: UserReport;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`user/reportBlog`, data)
        );
    }

    static async getNotification(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: NotificationType[];
        };
        return await requestApiHelper<body>(axiosJWT.get(`user/listNotify`));
    }

    static async readNotification(idNoti: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: NotificationType;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`user/checkIsRead/${idNoti}`)
        );
    }
    static async getReportType(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ReportType[];
        };
        return await requestApiHelper<body>(axiosJWT.get(`user/report`));
    }
    static async getNotificationByType(type: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: NotificationType[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`user/listNotifyByType/${type}`)
        );
    }

    static async sharePost(idPost: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`user/shareBlog/${idPost}`)
        );
    }
    static async likeBlog(idBlog: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`/user/likeBlog/${idBlog}`)
        );
    }
    static async saveBlog(idBlog: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`/user/saveBlog/${idBlog}`)
        );
    }
}

export default UserServices;
