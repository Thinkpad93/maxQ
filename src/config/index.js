//axios 默认配置
import qs from 'qs';

export const AXIOS_DEFAULT_CONFIG = {
    baseURL: 'http://192.168.18.105:8080/qxiao-cms/',
    //baseURL: 'http://192.168.18.106:8080/qxiao-cms/',
    timeout: 2000,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //headers: { 'content-type': 'application/json' }
    transformRequest: [data => {
        return qs.stringify(data, { indices: false });
    }]
}