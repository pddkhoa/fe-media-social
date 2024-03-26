import identity from "@/api/interceptor";
import { Category, CategoryDetail } from "@/type/category";
import { Post } from "@/type/post";
import { Tag } from "@/type/tag";
import { requestApiHelper } from "@/utils/apiRequest";

class ClientServices {
    static async uploadAvatar(form: FormData) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: {
                publicId: string;
                url: string;
            };
        };
        return await requestApiHelper<body>(
            identity.put("user/changeAvatar", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }
    static async updateInfo(data: {
        username: string;
        name: string;
        phone: string;
        second_name: string;
        gender: string;
        email: string;
        Descriptions: string;
        address: string;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: {
                publicId: string;
                url: string;
            };
        };
        return await requestApiHelper<body>(
            identity.patch("/user/changeInfo", data)
        );
    }
    static async resetPassword(data: {
        oldPassword: string;
        password: string;
        confirmPassword: string;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: {
                publicId: string;
                url: string;
            };
        };
        return await requestApiHelper<body>(
            identity.patch("/user/resetPassword", data)
        );
    }
    static async getBlogUser() {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post[];
        };
        return await requestApiHelper<body>(identity.get("blog/allBlog"));
    }
    static async uploadAvatarPost(form: FormData) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            identity.post("blog/uploadImage", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }
    static async getCategoriesByUser(index: number) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category[];
        };
        return await requestApiHelper<body>(
            identity.get(`category/userCategories/${index}`)
        );
    }
    static async getAllTags() {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Tag[];
        };
        return await requestApiHelper<body>(identity.get("tag/allTag"));
    }
    static async addTags(data: { name: string }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Tag;
        };
        return await requestApiHelper<body>(identity.post("tag/addTag", data));
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
    static async getAllCategories(index: number) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Category[];
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
            result: Post[];
        };
        return await requestApiHelper<body>(
            identity.get(
                `blog/getAllByCategory?index=${index}&categoryId=${categoryId}`
            )
        );
    }

    static async deleteTags(tagId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(identity.delete(`tag/${tagId}`));
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
    static async addTagToCate(data: { categoryId: string; tagIds: string[] }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            identity.put(`category/addTagToCategory`, data)
        );
    }
    static async removeTagFromCate(data: {
        categoryId: string;
        tagIds: string[];
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            identity.put(`category/removeTag`, data)
        );
    }

    static async saveBlog(idBlog: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            identity.post(`/user/saveBlog/${idBlog}`)
        );
    }
    static async likeBlog(idBlog: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            identity.post(`/user/likeBlog/${idBlog}`)
        );
    }
}

export default ClientServices;
