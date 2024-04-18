import { ChatType } from "@/type/chat";
import { requestApiHelper } from "@/utils/apiRequest";

class ChatServices {
    static async singleChat(
        data: {
            userId: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ChatType;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("user/singleChat", data)
        );
    }
    static async getListChat(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ChatType[];
        };
        return await requestApiHelper<body>(axiosJWT.get("user/listChat"));
    }
}

export default ChatServices;
