import { CategoryDetail } from "@/type/category";
import { Post } from "@/type/post";
import {
    ReportBlogType,
    ReportCommentType,
    ReportTagType,
    ReportType,
    ReportUserType,
} from "@/type/report";
import { Tag } from "@/type/tag";
import { User } from "@/type/user";
import { requestApiHelper } from "@/utils/apiRequest";

class AdminServices {
    static async getAllBlog(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post[];
        };
        return await requestApiHelper<body>(axiosJWT.get("admin/allBlog"));
    }

    static async deleteBlog(idBlog: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.delete(`admin/${idBlog}/deleteBlog`)
        );
    }

    static async getCategories(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: CategoryDetail[];
        };
        return await requestApiHelper<body>(axiosJWT.get("admin/allCategory"));
    }
    static async deleteCategories(idCate: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.delete(`admin/${idCate}/deleteCategory`)
        );
    }
    static async getTags(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Tag[];
        };
        return await requestApiHelper<body>(axiosJWT.get("admin/allTag"));
    }
    static async deteleTag(idTag: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.delete(`admin/${idTag}/deleteTag`)
        );
    }
    static async getUser(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: User[];
        };
        return await requestApiHelper<body>(axiosJWT.get("admin/allUser"));
    }
    static async getUserBlocked(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: User[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("admin/allUserBlocked")
        );
    }
    static async addUser(
        data: {
            username: string;
            password: string;
            name: string;
            second_name: string;
            phone: string;
            email: string;
            gender: string;
            roles: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("auth/registerAdmin", data)
        );
    }

    static async changeRole(
        data: { userId: string; role: string },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("admin/decentralization", data)
        );
    }
    static async blockUser(data: { userId: string }, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("admin/blockedUser", data)
        );
    }
    static async openUser(data: { userId: string }, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("admin/openAccount", data)
        );
    }
    static async getListReportBlog(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ReportBlogType[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("admin/Blog/listReport")
        );
    }
    static async getListReportUser(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ReportUserType[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("admin/User/listReport")
        );
    }
    static async getListReportTag(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ReportTagType[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("admin/Tag/listReport")
        );
    }
    static async getListReportComment(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ReportCommentType[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("admin/Comment/listReport")
        );
    }

    static async evulateReport(
        data: { reportId: string; type: string; status: boolean },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("admin/evaluateReport", data)
        );
    }
    static async getListReport(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ReportType[];
        };
        return await requestApiHelper<body>(axiosJWT.get("user/report"));
    }
    static async addReport(data: { value: string }, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("admin/addTypeReport", data)
        );
    }
    static async editReport(
        data: { reportId: string; value: string },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.patch("admin/editTypeReport", data)
        );
    }
    static async deleteReport(data: { reportId: string }, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("admin/deleteTypeReport", data)
        );
    }
}

export default AdminServices;
