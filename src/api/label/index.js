import http from '@/utils/request';

//查询标签信息
export const showDeviceList = (params) => {
    return http.fetchPost('/action/mod-xiaoq/device/queryLabel.action', params);
}