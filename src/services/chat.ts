import { ChatType, MessageType } from "@/type/chat";
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
    static async getListChatRequest(axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: ChatType[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get("user/listChatIsWait")
        );
    }
    static async getMessage(chatId: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: MessageType[];
        };
        return await requestApiHelper<body>(
            axiosJWT.get(`user/listMessage/${chatId}`)
        );
    }
    static async sendMessage(
        data: {
            chatId: string;
            message: string;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: MessageType;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("user/sendMessage", data)
        );
    }

    static async evaluteMessageRequest(
        data: {
            chatId: string;
            status: boolean;
        },
        axiosJWT: any
    ) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: MessageType;
        };
        return await requestApiHelper<body>(
            axiosJWT.post("user/evaluateChat", data)
        );
    }
    static async deleteMessage(idMess: string, axiosJWT: any) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: MessageType;
        };
        return await requestApiHelper<body>(
            axiosJWT.delete(`user/deleteMessage/${idMess}`)
        );
    }
}

export default ChatServices;
