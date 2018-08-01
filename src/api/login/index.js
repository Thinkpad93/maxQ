import http from '@/utils/request';

export const userLogin = (params) => {
    return http.fetchPost('/action/mod-xiaoq/login.action', params);
}