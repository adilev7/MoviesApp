import axios from "axios";
import { API_KEY, API_URL } from "@/constants";

const reqInterceptHandler = (config) => {
  config.params = {
    api_key: API_KEY,
    ...config.params,
  };
  config.headers = {
    ...config.headers,
    Accept: "application/json, text/javascript, */*",
    "Content-Type": "application/json",
  };
  return config;
};

const resSuccessHandler = (res) => {
  return res;
};
const resErrorHandler = (error) => {
  return Promise.reject(error);
};

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(reqInterceptHandler);
instance.interceptors.response.use(resSuccessHandler, resErrorHandler);

export default instance;
