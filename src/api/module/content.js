import ax from '../axios'

//查询栏目
export function queryChannel(params) {
  return ax.post('/action/mod-xiaojiao/channel/queryChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询栏目all
export function queryChannelAll(params) {
  return ax.post('/action/mod-xiaojiao/channel/queryChannelAll.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增栏目
export function addChannel(params) {
  return ax.post('/action/mod-xiaojiao/channel/addChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑栏目
export function updateChannel(params) {
  return ax.post('/action/mod-xiaojiao/channel/updateChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除栏目
export function deleteChannel(params) {
  return ax.post('/action/mod-xiaojiao/channel/deleteChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询栏目模板
export function queryChannelTemplate(params) {
  return ax.post('/action/mod-xiaojiao/channel/template/queryChannelTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询栏目模板(不带参数)
export function queryChannelTemplateAll(params) {
  return ax.post('/action/mod-xiaojiao/channel/template/queryChannelTemplateAll.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增栏目模板
export function addChannelTemplate(params) {
  return ax.post('/action/mod-xiaojiao/channel/template/addChannelTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询栏目模板详细
export function queryChannelTemplateDetail(params) {
  return ax.post('/action/mod-xiaojiao/channel/templateDetail/queryChannelTemplateDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑栏目模板
export function updateChannelTemplate(params) {
  return ax.post('/action/mod-xiaojiao/channel/template/updateChannelTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增栏目模板详细项
export function addChannelTemplateDetail(params) {
  return ax.post('/action/mod-xiaojiao/channel/templateDetail/addChannelTemplateDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//修改栏目模板详细项
export function updateChannelTemplateDetail(params) {
  return ax.post('/action/mod-xiaojiao/channel/templateDetail/updateChannelTemplateDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除栏目模板详细项
export function deleteChannelTemplateDetail(params) {
  return ax.post('/action/mod-xiaojiao/channel/templateDetail/deleteChannelTemplateDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//设置默认栏目模板
export function updateDefaultTemplate(params) {
  return ax.post('/action/mod-xiaojiao/channel/template/updateDefaultTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除栏目模板
export function deleteChannelTemplate(params) {
  return ax.post('/action/mod-xiaojiao/channel/template/deleteChannelTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学校播放频道
export function querySchoolPlayChannel(params) {
  return ax.post('/action/mod-xiaojiao/content/schoolPlay/querySchoolPlayChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增学校播放频道
export function addSchoolPlayChannel(params) {
  return ax.post('/action/mod-xiaojiao/content/schoolPlay/addSchoolPlayChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑学校播放频道
export function updateSchoolPlayChannel(params) {
  return ax.post('/action/mod-xiaojiao/content/schoolPlay/updateSchoolPlayChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除学校播放频道
export function deleteSchoolPlayChannel(params) {
  return ax.post('/action/mod-xiaojiao/content/schoolPlay/deleteSchoolPlayChannel.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询频道对应内容列表
export function queryChannelContent(params) {
  return ax.post('/action/mod-xiaojiao/channel/queryChannelContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询我的上传列表
export function queryContentList(params) {
  return ax.post('/action/mod-xiaojiao/channel/content/queryContentList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除我的上传内容
export function deleteContent(params) {
  return ax.post('/action/mod-xiaojiao/channel/content/deleteContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//上传内容
export function uploadContent(params) {
  return ax.post('/action/mod-xiaojiao/channel/content/uploadContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询编辑内容
export function queryContentByContentId(params) {
  return ax.post('/action/mod-xiaojiao/channel/content/queryContentByContentId.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑上传内容
export function updateContent(params) {
  return ax.post('/action/mod-xiaojiao/channel/content/updateContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//显示内容模板列表
export function queryContentTemplate(params) {
  return ax.post('/action/mod-xiaojiao/channel/content/queryContentTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//保存模板
export function addContentTemplate(params) {
  return ax.post('/action/mod-xiaojiao/channel/addContentTemplate.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询审核内容列表
export function queryCheckContentList(params) {
  return ax.post('/action/mod-xiaojiao/channel/check/queryCheckContentList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//审核内容
export function checkContent(params) {
  return ax.post('/action/mod-xiaojiao/channel/check/checkContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//进行内容预发布
export function prepublishContent(params) {
  return ax.post('/action/mod-xiaojiao/content/prePublish/prepublishContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//内容发布详细查询
export function queryPublishContent(params) {
  return ax.post('/action/mod-xiaojiao/content/prePublish/queryPublishContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询终审通过内容
export function queryCheckedContent(params) {
  return ax.post('/action/mod-xiaojiao/content/queryCheckedContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//进行内容正式发布
export function publishContent(params) {
  return ax.post('/action/mod-xiaojiao/content/prePublish/publishContent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询预发布内容列表
export function queryPublishContentList(params) {
  return ax.post('/action/mod-xiaojiao/content/prePublish/queryPublishContentList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
