import axiosInstance from './../util/APIClient';

export interface ApiResponse<T> {
    data: T;
    statusCode: number;
}

export const APIService = {
    get: async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.get<T>(url, { params });
        return { data: response.data, statusCode: response.status };
    },

    post: async <T, B>(url: string, body: B): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.post<T>(url, body);
        return { data: response.data, statusCode: response.status };
    },

    put: async <T, B>(url: string, body: B): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.put<T>(url, body);
        return { data: response.data, statusCode: response.status };
    },

    delete: async <T>(url: string): Promise<ApiResponse<T>> => {
        const response = await axiosInstance.delete<T>(url);
        return { data: response.data, statusCode: response.status };
    },
};