import http from '@/utils/request';

//设备列表
export const showDeviceList = (params) => {
    return http.fetchPost('/action/mod-xiaoq/showDeviceList.action', params);
}
//新增设备绑定
export const addDeviceBind = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/addDeviceBind.do', params);
}
//编辑设备绑定
export const updateDeviceBind = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/updateDeviceBind.do', params);
}
//删除设备绑定
export const deleteDeviceBind = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/deleteDeviceBind.do', params);
}

//显示设备状态
export const showDeviceStatus = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/showDeviceStatus.do', params);
}
//显示设备运行日志
export const showDeviceRunLog = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/showDeviceRunLog.do', params);
}
//发送设备命令
export const sendDeviceCommand = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/sendDeviceCommand.do', params);
}
//显示设备详情
export const showDeviceDetail = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/showDeviceDetail.do', params);
}
//显示检修列表
export const showRepairList = (params) => {
    console.log(params);
    return http.fetchPost('/action/mod-xiaoq/showRepairList.action', params);
}
//新增检修记录
export const addDeviceRepair = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/addDeviceRepair.do', params);
}
//编辑检修记录
export const updateDeviceRepair = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/updateDeviceRepair.do', params);
}
//删除检修记录
export const deleteDeviceRepair = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/deleteDeviceRepair.do', params);
}