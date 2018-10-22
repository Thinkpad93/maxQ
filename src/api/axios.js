import store from '@/store';
import axios from 'axios';
import qs from 'qs';

import {
  getToken
} from '@/utils/auth';

//import Nprogress from 'nprogress';
//import 'nprogress/nprogress.css';



const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000,
  withCredentials: true //允许携带cookie
});

//请求拦截器
service.interceptors.request.use(config => {
  //console.log("请求拦截器");
  //console.log(config);
  //Nprogress.start();
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
  //console.log(config);
  //Nprogress.done();
  return config;
}, error => {
  //Nprogress.done();
  //console.log('err' + error) // for debug
  return Promise.reject(error);
});


export default service;
