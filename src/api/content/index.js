import http from '@/utils/request';

//查询栏目
export const queryChannel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryChannel.do', params);
}
//查询栏目all
export const queryChannelAll = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryChannelAll.do', params);
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
  return http.fetchPost('/action/mod-xiaojiao/channel/template/queryChannelTemplate.do', params);
}
//新增栏目模板
export const addChannelTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/addChannelTemplate.do', params);
}
//查询栏目模板详细
export const queryChannelTemplateDetail = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/templateDetail/queryChannelTemplateDetail.do', params);
}
//编辑栏目模板
export const updateChannelTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/updateChannelTemplate.do', params);
}
//新增栏目模板详细项
export const addChannelTemplateDetail = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/templateDetail/addChannelTemplateDetail.do', params);
}
//修改栏目模板详细项
export const updateChannelTemplateDetail = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/templateDetail/updateChannelTemplateDetail.do', params);
}
//删除栏目模板详细项
export const deleteChannelTemplateDetail = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/templateDetail/deleteChannelTemplateDetail.do', params);
}
