import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getToken();
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    console.error;
    return Promise.reject(error);
  }
);

export default axiosInstance;
