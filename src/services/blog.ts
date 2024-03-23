import identity from "@/api/interceptor";
import { CategoryPost } from "@/type/post";
import { requestApiHelper } from "@/utils/apiRequest";

class BlogServices {
    static async getCateByUserNotPagi() {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: CategoryPost[];
        };
        return await requestApiHelper<body>(
            identity.get("category/categoryByUserNotPaging")
        );
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
    static uploadImagePost = async (file: File) => {
        type body = {
            success: boolean;
            message: string;
            result: string;
            statusCode: number;
        };
        const formData = new FormData();
        formData.append("image", file);
        const res = await requestApiHelper<body>(
            identity.post("blog/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );

        return res;
    };
    static async addPost(data: {
        title: string;
        description: string;
        content: string;
        avatar: string;
        categoryIds: string;
        tagIds: string[];
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(identity.post("blog/create", data));
    }
    static async addPostDraft(data: {
        title: string;
        description: string;
        content: string;
        avatar: string;
        categoryIds: string;
        tagIds: string[];
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(
            identity.post("blog/createDraft", data)
        );
    }
}

export default BlogServices;
