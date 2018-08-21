import http from '@/utils/request';

//查询栏目
export const queryChannel = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/queryChannel.do', params);
}
//新增栏目
export const addChannel = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/addChannel.do', params);
}
//编辑栏目
export const updateChannel = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/updateChannel.do', params);
}
//删除栏目
export const deleteChannel = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/deleteChannel.do', params);
}
//查询栏目模板
export const queryChannelTemplate = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/queryChannelTemplate.do', params);
}
//新增栏目模板
export const addChannelTemplate = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/addChannelTemplate.do', params);
}
//查询栏目模板详细
export const queryChannelTemplateDetail = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/queryChannelTemplateDetail.do', params);
}
//编辑栏目模板
export const updateChannelTemplate = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/channel/updateChannelTemplate.do', params);
}