import http from '@/utils/request';

export const userRouter = (params) => {
    return http.fetchPost('/action/mod-xiaoq/router.action', params);
}