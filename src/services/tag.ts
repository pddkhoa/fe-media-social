import identity from "@/api/interceptor";
import { Tag } from "@/type/tag";
import { requestApiHelper } from "@/utils/apiRequest";

class TagServices {
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

    static async deleteTags(tagId: string) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(identity.delete(`tag/${tagId}`));
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
            identity.patch(`category/removeTag`, data)
        );
    }
}

export default TagServices;
