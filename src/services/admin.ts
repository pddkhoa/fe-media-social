import { CategoryDetail } from "@/type/category";
import { Post } from "@/type/post";
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
}

export default AdminServices;
