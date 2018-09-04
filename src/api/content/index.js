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
//查询栏目模板(不带参数)
export const queryChannelTemplateAll = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/template/queryChannelTemplateAll.do', params);
}
//新增栏目模板
export const addChannelTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/template/addChannelTemplate.do', params);
}
//查询栏目模板详细
export const queryChannelTemplateDetail = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/templateDetail/queryChannelTemplateDetail.do', params);
}
//编辑栏目模板
export const updateChannelTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/template/updateChannelTemplate.do', params);
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
//设置默认栏目模板
export const updateDefaultTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/template/updateDefaultTemplate.do', params);
}
//删除栏目模板
export const deleteChannelTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/template/deleteChannelTemplate.do', params);
}
//查询学校播放频道
export const querySchoolPlayChannel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/content/schoolPlay/querySchoolPlayChannel.do', params);
}
//新增学校播放频道
export const addSchoolPlayChannel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/content/schoolPlay/addSchoolPlayChannel.do', params);
}
//编辑学校播放频道
export const updateSchoolPlayChannel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/content/schoolPlay/updateSchoolPlayChannel.do', params);
}
//删除学校播放频道
export const deleteSchoolPlayChannel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/content/schoolPlay/deleteSchoolPlayChannel.do', params);
}
//查询频道对应内容列表
export const queryChannelContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryChannelContent.do', params);
}
//查询我的上传列表
export const queryContentList = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryContentList.do', params);
}
//删除我的上传内容
export const deleteContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/deleteContent.do', params);
}
//上传内容
export const uploadContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/uploadContent.do', params);
}
//显示内容模板列表
export const queryContentTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryContentTemplate.do', params);
}
//保存模板
export const addContentTemplate = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/addContentTemplate.do', params);
}
//查询审核内容列表
export const querycheckContentList = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/querycheckContentList.do', params);
}
//审核内容
export const checkContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/checkContent.do', params);
}
//进行内容预发布
export const prepublishContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/prepublishContent.do', params);
}
//内容发布详细查询
export const queryPublishContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryPublishContent.do', params);
}
//查询终审通过内容
export const queryCheckedContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryCheckedContent.do', params);
}
//进行内容正式发布
export const publishContent = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/publishContent.do', params);
}
//查询预发布内容列表
export const queryPrepublishContentList = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/channel/queryPrepublishContentList.do', params);
}
