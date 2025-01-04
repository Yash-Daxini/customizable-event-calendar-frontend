import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { LOCALSTORAGE_USER_KEY } from '../constants/authConstants';
import { showErrorToaster } from './Toaster';
const env = import.meta.env;

const axiosInstance = axios.create({
  baseURL: env.VITE_BASE_URL,
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userObject = localStorage.getItem(LOCALSTORAGE_USER_KEY);
    if (userObject) {
      config.headers.Authorization = `Bearer ${JSON.parse(userObject)?.token}`;
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      showErrorToaster('Unauthorized! Redirecting to login...');
    }
    else {
      const serverErrorMessage = error.response?.data?.errorMessage;
      if (serverErrorMessage)
        showErrorToaster(serverErrorMessage);
      else
        showErrorToaster('Oops ! Some error occured.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
