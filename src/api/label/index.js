import http from '@/utils/request';

//查询标签信息
export const queryLabel = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/queryLabel.do', params);
}