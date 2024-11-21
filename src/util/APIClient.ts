import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
const env = import.meta.env;

const axiosInstance = axios.create({
    baseURL: env.VITE_BASE_URL,
    timeout: 10000,
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;