import http from '@/utils/request';


//查询学校列表
export const showSchoolList = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/showSchoolList.do', params);
}

//查询区域
export const queryRegion = (params) => {
    return http.fetchPost('/action/mod-xiaojiao/region/queryRegion.do', params);
}