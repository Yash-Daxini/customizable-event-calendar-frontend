import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { LOCALSTORAGE_USER_KEY } from '../constants/authConstants';
import { showErrorToaster } from './Toaster';
import { OverlapResponse } from '../models/OverlapEventResponse';
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
      const overlapErrorMessage: OverlapResponse = error.response?.data?.overlapMessage;
      const noEventOccurrenceErrorMessage = error.response?.data?.noEventOccurrenceMessage;

      if (serverErrorMessage)
        showErrorToaster(serverErrorMessage);
      else if (overlapErrorMessage)
        return Promise.reject(overlapErrorMessage);
      else if (noEventOccurrenceErrorMessage)
        return Promise.reject(noEventOccurrenceErrorMessage);
      else
        showErrorToaster('Oops ! Some error occured.');
    }
  }
);

export default axiosInstance;
