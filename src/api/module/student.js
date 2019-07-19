import ax from '../axios';

//查询学生列表（微信端）
export function queryStudent(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/student/queryStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//录入学生信息（微信端）
export function addStudent(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/student/addStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑学生信息（微信端）
export function updateStudent(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/student/updateStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除学生信息（微信端）
export function deleteStudent(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/student/deleteStudent.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//批量导入学生（微信端）
export function studentDownloadExcelTemp(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/student/downloadExcelTemp.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//批量导入学生（微信端）
export function batchStudents(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/student/batchStudents.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
