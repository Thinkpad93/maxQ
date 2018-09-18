import axios from 'axios';
import qs from 'qs';
import {
  AXIOS_DEFAULT_CONFIG
} from '@/config';

const ax = axios.create({
  baseURL: AXIOS_DEFAULT_CONFIG.baseURL,
  timeout: AXIOS_DEFAULT_CONFIG.timeout
});

//请求拦截器
ax.interceptors.request.use(config => {
  console.log("请求拦截器");
  console.log(config);
  if (config.headers['Content-Type'] === "application/json") {
    //...
  } else {
    config.data = qs.stringify(config.data, {
      indices: false
    });
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// 响应拦截器
ax.interceptors.response.use(config => {
  console.log("响应拦截器");
  console.log(config);
  return config;
}, error => {
  return Promise.reject(error);
});


export default ax;
