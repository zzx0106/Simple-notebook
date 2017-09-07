import axios from "axios";
import { message } from "antd";
export const HttpUtils = {
  axios(baseUrl, url, method = "get", params, cookie = true) {
    let axiosInstance;
    // 创建接口连接实例
    axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
      withCredentials: cookie, //带cookie
      headers: {
        Accept: "application/json, text/javascript, */*",
        "Content-Type": "application/json;charset=utf-8"
      }
    });
    // 超时时间
    // http请求拦截器
    axiosInstance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        message.error({
          content: "加载超时",
          duration: 3
        });
        return Promise.reject(error);
      }
    );
    // http响应拦截器
    axiosInstance.interceptors.response.use(
      data => {
        return data;
      },
      error => {
        message.error({
          content: "响应超时",
          duration: 3
        });
        return Promise.reject(error);
      }
    );
    return axiosInstance({
      url: url,
      method: method.toLocaleLowerCase(),
      data: JSON.stringify(params),
      //`onUploadProgress`上传进度事件
      onUploadProgress: function(progressEvent) {},
      //下载进度的事件
      onDownloadProgress: function(progressEvent) {}
    });
  }
};
