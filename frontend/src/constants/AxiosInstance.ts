import axios from "axios";
import { BASE_URL } from "@/constants/Code";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("uid");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
