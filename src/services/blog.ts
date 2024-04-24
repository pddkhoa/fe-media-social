import { Comment } from "@/type/comment";
import { CategoryPost, Post } from "@/type/post";
import { requestApiHelper } from "@/utils/apiRequest";

class BlogServices {
    static async getCateByUserNotPagi(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: CategoryPost[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("category/categoryByUserNotPaging")
        );
    }
    static async uploadAvatarPost(form: FormData, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("blog/uploadImage", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
    }
    static uploadImagePost = async (file: File, axiosJWT: any) => {
        type body = {
            success: boolean;
            message: string;
            result: string;
            statusCode: number;
        };
        const formData = new FormData();
        formData.append("image", file);
        const res = await requestApiHelper<body>(
            axiosJWT.post("blog/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );

        return res;
    };
    static async addPost(
        data: {
            title: string;
            description: string;
            content: string;
            avatar: string;
            categoryIds: string;
            tagIds: string[];
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(axiosJWT.post("blog/create", data));
    }
    static async addPostDraft(
        data: {
            title: string;
            description: string;
            content: string;
            avatar: string;
            categoryIds: string;
            tagIds: string[];
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
            axiosJWT.post("blog/createDraft", data)
        );
    }
    static async getAllBlogByUser(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post[];
        };
        return await requestApiHelper<body>(axiosJWT.get("blog/allBlog"));
    }
    static async deletePost(idPost: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: any;
        };
        return await requestApiHelper<body>(axiosJWT.delete(`blog/${idPost}`));
    }
    static async getAllBlogDraft(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("blog/listBlogDraftByUser")
        );
    }
    static async getAllBlogBookmark(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("/blog/listBlogSaveByUser")
        );
    }
    static async editPost(
        data: {
            title: string;
            description: string;
            content: string;
            avatar: string;
            categoryIds: string;
            tagIds: string[];
            status: string;
        },
        idBlog: string,
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            axiosJWT.put(`blog/edit/${idBlog}`, data)
        );
    }
    static async getBlogByUserID(userId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`/user/listBlog/${userId}`)
        );
    }

    static async addComment(
        data: {
            blogId: string;
            replyToCommentId: string | null;
            content: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Comment;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("user/comment", data)
        );
    }

    static async deleteComment(
        data: {
            blogId: string;
            commentId: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Comment;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("user/deleteComment", data)
        );
    }
    static async editComment(
        data: { blogId: string; commentId: string },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Comment;
        };
        return await requestApiHelper<body>(
            axiosJWT.patch("user/comment", data)
        );
    }

    static async getBlogLastest(index: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: {
                posts: Post[];
                size: number;
            };
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`blog/listBlogNew?index=${index}`)
        );
    }

    static async getBlogPopular(index: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: {
                posts: Post[];
                size: number;
            };
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`blog/listBlogPopularity?index=${index}`)
        );
    }
    static async getBlogDiscuss(index: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: {
                posts: Post[];
                size: number;
            };
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`blog/listBlogDiscussions?index=${index}`)
        );
    }

    static async getBlogInFeed(index: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: {
                posts: Post[];
                size: number;
            };
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`blog/${index}/listBlogInFeed`)
        );
    }
    static async getBlogShare(userId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`blog/${userId}/listBlogShareBy`)
        );
    }

    static async getBlogById(blogId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Post;
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`/blog/getBlogById/${blogId}`)
        );
    }
}

export default BlogServices;
