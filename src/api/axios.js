import axios from 'axios';
import qs from 'qs';
import {
  Loading
} from 'element-ui';

let loading;

const service = axios.create({
  baseURL: "http://192.168.18.114:8080/qxiao-cms/",
  timeout: 5000
});

//请求拦截器
service.interceptors.request.use(config => {
  console.log("请求拦截器");
  console.log(config);
  loading = Loading.service({
    text: '玩命加载中',
  });
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
  loading.close();
  return config;
}, error => {
  loading.close();
  console.log('err' + error) // for debug
  return Promise.reject(error);
});


export default service;
