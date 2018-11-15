import store from '@/store';
import axios from 'axios';
import qs from 'qs';

import {
  getToken
} from '@/utils/auth';


const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true //允许携带cookie
});

//请求拦截器
service.interceptors.request.use(config => {
  //console.log("请求拦截器");
  console.log(config);
  if (store.getters.token) {
    config.headers['Authorization'] = getToken();
  }
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
service.interceptors.response.use(config => {
  //console.log("响应拦截器");
  console.log(config);
  console.log("上司上司上司");
  return config;
}, error => {
  console.log("我上司我上司我上司");
  console.log('err' + error) // for debug
  return Promise.reject(error);
});


export default service;
