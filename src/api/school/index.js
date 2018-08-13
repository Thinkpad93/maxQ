import http from '@/utils/request';

export const showSchoolList = (params) => {
    return http.fetchPost('/action/mod-xiaoq/device/showDeviceList.action', params);
}