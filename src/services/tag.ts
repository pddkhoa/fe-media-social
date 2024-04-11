import { Tag } from "@/type/tag";
import { requestApiHelper } from "@/utils/apiRequest";

class TagServices {
    static async getAllTags(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Tag[];
        };
        return await requestApiHelper<body>(axiosJWT.get("tag/allTag"));
    }
    static async addTags(data: { name: string }, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: Tag;
        };
        return await requestApiHelper<body>(axiosJWT.post("tag/addTag", data));
    }

    static async deleteTags(tagId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(axiosJWT.delete(`tag/${tagId}`));
    }

    static async addTagToCate(
        data: { categoryId: string; tagIds: string[] },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            axiosJWT.put(`category/addTagToCategory`, data)
        );
    }
    static async removeTagFromCate(
        data: {
            categoryId: string;
            tagIds: string[];
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(
            axiosJWT.patch(`category/removeTag`, data)
        );
    }
}

export default TagServices;
