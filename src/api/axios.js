import store from '@/store';
import axios from 'axios';
import qs from 'qs';
import {
  Loading
} from 'element-ui';
import {
  getToken
} from '@/utils/auth';

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';


let loading;

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
});

//请求拦截器
service.interceptors.request.use(config => {
  console.log("请求拦截器");
  console.log(config);
  Nprogress.start();
  // loading = Loading.service({
  //   text: '加载中',
  // });
  if (store.getters.token) {
    config.headers['X-Token'] = getToken();
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
  console.log("响应拦截器");
  console.log(config);
  //loading.close();
  Nprogress.done();
  return config;
}, error => {
  Nprogress.done();
  //loading.close();
  console.log('err' + error) // for debug
  return Promise.reject(error);
});


export default service;
