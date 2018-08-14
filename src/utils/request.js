import { AXIOS_DEFAULT_CONFIG } from '@/config';
import axios from 'axios';

axios.defaults.baseURL = AXIOS_DEFAULT_CONFIG.baseURL;
axios.defaults.timeout = AXIOS_DEFAULT_CONFIG.timeout;
axios.defaults.headers = AXIOS_DEFAULT_CONFIG.headers;
axios.defaults.transformRequest = AXIOS_DEFAULT_CONFIG.transformRequest;

//请求拦截器
axios.interceptors.request.use(config => {
  console.log("请求拦截器");
  return config;
}, error => {
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
  console.log("响应拦截器");
  return response;
}, error => {
  return Promise.reject(error);
});


//axios 请求

export default {
  /** 
   * get方法，对应get请求 
   * @param {String} url [请求的url地址] 
   * @param {Object} params [请求时携带的参数] 
   */  
  fetchGet(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  },
  /** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
  fetchPost(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res);
      }).catch(error => {
        reject(error);
      })
    })
  }
}
