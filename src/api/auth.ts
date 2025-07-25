import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

export const attachAuthInterceptor = (logout: () => void) => {
    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                logout();
            }
            return Promise.reject(error);
        }
    );
};

export default api;
