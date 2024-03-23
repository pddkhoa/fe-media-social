import identity from "@/api/interceptor";
import { Category, CategoryDetail } from "@/type/category";
import { Post } from "@/type/post";
import { User } from "@/type/user";
import { requestApiHelper } from "@/utils/apiRequest";

class CategoriesServices {
    static async getCategoriesByUser(index: number) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: { categories: Category[]; size: number };
        };
        return await requestApiHelper<body>(
            identity.get(`category/userCategories/${index}`)
        );
    }

    static async addCategories(data: {
        name: string;
        description: string;
        tagIds: string[];
        status: string;
        userIds: string[];
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category;
        };
        return await requestApiHelper<body>(
            identity.post("category/addCategory", data)
        );
    }
    static async editCategories(data: {
        name: string;
        description: string;
        status: string;
        categoryId: string;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: CategoryDetail;
        };
        return await requestApiHelper<body>(
            identity.patch("category/edit", data)
        );
    }
    static async getAllCategories(index: number) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: { categories: Category[]; size: number };
        };
        return await requestApiHelper<body>(
            identity.get(`category/allCategories/${index}`)
        );
    }
    static async getCategoriesById(categoryId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: CategoryDetail;
        };
        return await requestApiHelper<body>(
            identity.get(`category?categoryId=${categoryId}`)
        );
    }
    static async getBlogByCategories(categoryId: string, index: number) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: { posts: Post[]; size: number };
        };
        return await requestApiHelper<body>(
            identity.get(
                `blog/getAllByCategory?index=${index}&categoryId=${categoryId}`
            )
        );
    }

    static async joinCategories(categoryId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category;
        };
        return await requestApiHelper<body>(
            identity.put(`category/joinCategory/${categoryId}`)
        );
    }
    static async leaveCategories(categoryId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category;
        };
        return await requestApiHelper<body>(
            identity.put(`category/leaveCategory/${categoryId}`)
        );
    }
    static async deleteCategories(categoryId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            identity.delete(`category/${categoryId}`)
        );
    }
    static async uploadAvatarCate(form: FormData, categoryId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            identity.put(`category/changeAvatar/${categoryId}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }
    static async getUserRequestCate(categoryId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: User[];
        };
        return await requestApiHelper<body>(
            identity.get(`category/userRequest/${categoryId}`)
        );
    }
    static async evaluteRequestCate(data: {
        categoryId: string;
        user_id: string;
        status: number;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string | null;
        };
        return await requestApiHelper<body>(
            identity.post(`category/evaluateRequest`, data)
        );
    }
}

export default CategoriesServices;
