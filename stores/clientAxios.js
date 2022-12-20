import baseApiUrl from "@/utils/baseApiUrl";
import axios from "axios";

export const getFromLocalStorage = (key) => {
  try {
    if (typeof window === "undefined") return null;
    const value = window.localStorage.getItem(key);
    if (!value) return null;
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (e) {
    return null;
  }
};

const axiosClient = axios.create({
  baseURL: baseApiUrl,
  timeout: 20000,
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (token) config.headers = { ...config.headers, ...headers };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosClient;
