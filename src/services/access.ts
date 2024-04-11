import api from "@/api/axios";
import identity from "@/api/interceptor";
import { requestApiHelper } from "@/utils/apiRequest";

class AccessService {
    static async login(data: { username: string; password: string }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string;
        };
        return await requestApiHelper<body>(api.post("auth/login", data));
    }
    static async register(data: {
        username: string;
        password: string;
        name: string;
        second_name: string;
        phone: string;
        email: string;
        gender: string;
        roles: string;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string | null;
        };
        return await requestApiHelper<body>(
            identity.post("auth/register", data)
        );
    }

    static async activeAccount(otp: unknown) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string | null;
        };
        return await requestApiHelper<body>(
            api.post(`auth/verify?token=${otp}`)
        );
    }
    static async forgotPassword(data: { email: string }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string | null;
        };
        return await requestApiHelper<body>(
            api.post(`auth/forgot-password`, data)
        );
    }
    static async resetPassword(data: {
        email: string;
        password: string;
        confirmPassword: string;
    }) {
        type body = {
            success: string;
            statusCode: number;
            message: string;
            result: string | null;
        };
        return await requestApiHelper<body>(
            api.post(`auth/reset-password`, data)
        );
    }
}

export default AccessService;
