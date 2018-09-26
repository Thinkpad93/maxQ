//axios 默认配置
//export const AXIOS_DEFAULT_CONFIG = {
//baseURL: 'http://192.168.18.114:8080/qxiao-cms/',
//baseURL: 'http://192.168.18.107:8080/qxiao-cms/',
//baseURL: 'http://192.168.18.253:8081/',
//baseURL: process.env.API_ROOT, // api的base_url
//timeout: 2000, // 请求超时时间
//}

const IS_DEV = process.env.NODE_ENV !== 'production';
export const API_ROOT = IS_DEV ? 'http://192.168.18.107:8080/qxiao-cms/' : 'http://192.168.18.253:8081/';
