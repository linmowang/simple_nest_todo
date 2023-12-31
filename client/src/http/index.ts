import axios from "axios";
import { baseURL } from "../contstants";

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (!token) return config;
    const bearerAuth = `Bearer ${localStorage.getItem("token")}`;
    return {
      ...config,
      headers: { Authorization: bearerAuth },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.message.includes("401")) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default http;
