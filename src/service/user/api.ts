import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";


import { tokenService } from "./tokenService";

const API = axios.create({
  // baseURL: 'pdfextractserver-production.up.railway.app/api/'
  baseURL: 'http://localhost:5000/api/'
})


API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenService.getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
)

API.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 403) {
        tokenService.clearToken();
        // store.dispatch(logOut());
      }
  
      if (error.response?.status === 401) {
        tokenService.clearToken();
        // store.dispatch(logOut());
        // navigateTo("/get-started");
      }
  
      return Promise.reject(error);
    }
  );
  

  export const signinApi = async (payload:{email:string,password:string})=>{
    return await API.post('/signin',payload)
  }
  export const processPdfApi = async (formData: FormData) => {
    return await API.post('/process-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };