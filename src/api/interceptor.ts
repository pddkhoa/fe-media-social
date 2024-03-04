import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const UNAUTHEN = ["/auth/register", "/active-account", "/forgot-password"];
const identity = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { url } = config;

  const unauthenticated = url && UNAUTHEN.includes(url);

  if (unauthenticated) {
    return config;
  }

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const onErrorResponse = (error: AxiosError | Error) => {
  throw error;
};

identity.interceptors.request.use(onRequest);
identity.interceptors.response.use(null, onErrorResponse);

export default identity;
