import { UserToken } from "@/type/user";
import axios from "axios";

export const createAxios = (user: UserToken) => {
    const newInstance = axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
        },
    });
    newInstance.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            const date = new Date();
            const decodedToken = user;
            if (decodedToken.exp < date.getTime() / 1000) {
                localStorage.clear();
                window.location.reload();
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};
