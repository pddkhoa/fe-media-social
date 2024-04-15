import { Category, CategoryDetail } from "@/type/category";
import { Post } from "@/type/post";
import { User } from "@/type/user";
import { requestApiHelper } from "@/utils/apiRequest";

class CategoriesServices {
    static async getCategoriesByUser(index: number, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: { categories: Category[]; size: number };
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`category/userCategories/${index}`)
        );
    }

    static async addCategories(
        data: {
            name: string;
            description: string;
            tagIds: string[];
            status: string;
            userIds: string[];
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("category/addCategory", data)
        );
    }
    static async editCategories(
        data: {
            name: string;
            description: string;
            status: string;
            categoryId: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: CategoryDetail;
        };
        return await requestApiHelper<body>(
            axiosJWT.patch("category/edit", data)
        );
    }
    static async getAllCategories(index: number, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: { categories: Category[]; size: number };
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`category/allCategories/${index}`)
        );
    }
    static async getCategoriesById(categoryId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: CategoryDetail;
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`category?categoryId=${categoryId}`)
        );
    }
    static async getBlogByCategories(
        categoryId: string,
        index: number,
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: { posts: Post[]; size: number };
        };
        return await requestApiHelper<body>(
            axiosJWT.get(
                `blog/getAllByCategory?index=${index}&categoryId=${categoryId}`
            )
        );
    }

    static async joinCategories(categoryId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category;
        };
        return await requestApiHelper<body>(
            axiosJWT.put(`category/joinCategory/${categoryId}`)
        );
    }
    static async leaveCategories(categoryId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category;
        };
        return await requestApiHelper<body>(
            axiosJWT.put(`category/leaveCategory/${categoryId}`)
        );
    }
    static async deleteCategories(categoryId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            axiosJWT.delete(`category/${categoryId}`)
        );
    }
    static async uploadAvatarCate(
        form: FormData,
        categoryId: string,
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            axiosJWT.put(`category/changeAvatar/${categoryId}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }
    static async getUserRequestCate(categoryId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: User[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`category/userRequest/${categoryId}`)
        );
    }
    static async evaluteRequestCate(
        data: {
            categoryId: string;
            user_id: string;
            status: number;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string | null;
        };
        return await requestApiHelper<body>(
            axiosJWT.post(`category/evaluateRequest`, data)
        );
    }
    static async getUserFriend(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: User[];
        };
        return await requestApiHelper<body>(axiosJWT.get(`user/listFriend`));
    }
    static async addUserCategories(
        data: {
            categoryId: string;
            userId: string;
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
            axiosJWT.put(`category/addUser`, data)
        );
    }
}

export default CategoriesServices;
