import { ResponseBase } from "@/type/response";
import axios, { AxiosResponse } from "axios";

const requestApiHelper = async <T>(
    promise: Promise<AxiosResponse>
): Promise<ResponseBase<T>> => {
    try {
        const { statusText, status, data, headers } = await promise;
        return {
            body: data,
            error: false,
            status: status,
            statusText: statusText,
            contentType: headers["content-type"],
            message: "Request success.",
        };
    } catch (error) {
        if (!axios.isAxiosError(error)) {
            return {
                error: true,
                message: "Request error",
                statusText: "Internal Server Error",
                status: 400,
                contentType: undefined,
            };
        }

        const { message, code, response } = error;

        return {
            body: response?.data,
            error: true,
            message:
                code === "ERR_NETWORK"
                    ? "Unstable internet connection, service connection failed."
                    : message,
            statusText: response?.statusText || code || "",
            status: response?.status || 400,
            contentType: undefined,
        };
    }
};

export { requestApiHelper };
