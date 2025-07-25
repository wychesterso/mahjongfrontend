import axios from "axios";
import { logoutUser } from "./auth";

const instance = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

instance.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            logoutUser();
        }
        return Promise.reject(err);
    }
);

export default instance;
