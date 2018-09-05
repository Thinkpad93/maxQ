import http from '@/utils/request';

//查询学校列表
export const showSchoolList = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/showSchoolList.do', params);
}
//新增学校
export const addSchool = (params, config) => {
  return http.fetchPost('/action/mod-xiaojiao/region/addSchool.do', params, config);
}
//编辑学校
export const updateSchool = (params, config) => {
  return http.fetchPost('/action/mod-xiaojiao/region/updateSchool.do', params, config);
}
//查询学校信息
export const querySchoolInfo = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/querySchoolInfo.do', params);
}
//查询区域
export const queryRegion = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/queryRegion.do', params);
}
//根据区域ID查询省市
export const findRegion = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/findRegion.do', params);
}
//根据学校Id查询区域
export const queryProvinceCityRegionBySchoolId = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/queryProvinceCityRegionBySchoolId.do', params);
}
//查询省市区所有数据
export const findAll = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/findAll.do', params);
}
//查询标签信息
export const queryLabel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/queryLabel.do', params);
}
//新增标签
export const addLabel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/addLabel.do', params);
}
//删除标签
export const deleteLabel = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/deleteLabel.do', params);
}
//查询学校类别
export const querySchoolCategory = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/querySchoolCategory.do', params);
}
//上传图片
export const addImage = (params) => {
  return http.fetchPost('/action/mod-xiaojiao/region/addImage.do', params);
}
