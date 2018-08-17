import http from '@/utils/request';


//查询学校列表
export const showSchoolList = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/showSchoolList.do', params);
}

//新增学校
export const addSchool = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/addSchool.do', params);
}

//查询学校信息
export const querySchoolInfo = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/querySchoolInfo.do', params);
}

//查询区域
export const queryRegion = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/queryRegion.do', params);
}

//查询标签信息
export const queryLabel = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/queryLabel.do', params);
}

//查询学校类别
export const querySchoolCategory = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/querySchoolCategory.do', params);
}


//上传图片
export const addImage = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/addImage.do', params);
}