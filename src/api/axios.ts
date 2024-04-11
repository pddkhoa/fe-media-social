import axios from "axios";

const api = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

export default api;
