import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // withCredentials: true, // this is important to work with cookie, this Includes cookies in the request
  credentials: true, // this is important to work with cookie, this Includes cookies in the request
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("token");
          <Navigate to="/login"></Navigate>;
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return [axiosSecure];
};

export default useAxiosSecure;
