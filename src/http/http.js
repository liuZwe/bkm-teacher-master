import axios from "axios";
import qs from "qs";
import router from "../router";

// import { getStorage, stateEnum } from '@/store/state/state';

export const getStorage = (k) => JSON.parse(localStorage.getItem(k) || "null");

const axiosInit = axios.create({
  baseURL: "https://bkmcsapi.heyhui.com/teacher/",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  // withCredentials: process.env.NODE_ENV === 'production' ? false : true
});

axiosInit.interceptors.request.use(
  (config) => {
    const _token = getStorage("user").token;
    config.headers["token"] = _token;
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axiosInit.interceptors.response.use(
  (config) => {
    switch (config.data.code) {
      case 200:
        return config.data.data || { code: 200 };
      case 401:
        setTimeout(() => {
          router.push("/login");
        }, 1200);
        return;
      // return Toast("登录过期,请重新登录");
      default:
        return config.data;
    }
  },
  (err) => {
    switch (err.response.status) {
      case 401:
        setTimeout(() => {
          // const _href = ( process.env.NODE_ENV !== "production" ? location.origin + '/#/login' : location.origin + "/app_h5/index.html#/login");
          router.push("/login");
          // location.href = _href;
        }, 1200);
        localStorage.removeItem("token");
        break;
      default:
        break;
    }
    return Promise.reject(err);
  }
);

/**
 * 请求
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) =>
  axiosInit({ url, params, method: "GET" });
//处理post请求
export const post = (url, data = {}) =>
  axiosInit({ url, data: data, method: "POST" });

export const put = (url, data = {}) =>
  axiosInit({ url, data: qs.stringify(data), method: "PUT" });

export const dele = (url, data = {}) =>
  axiosInit({ url, data, method: "DELETE" });
