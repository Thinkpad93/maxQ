import ax from '../axios';

//预录入号码（新增学校微信端）
export function addLeaderInit(params) {
  return ax.post('/action/mod-xiaojiao/weixin/school/addLeaderInit.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学校列表
export function querySchoolList(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/school/querySchoolList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//根据名称查询学校（微信端）
export function findSchool(params) {
  return ax.post('/action/mod-xiaojiao/weixin/school/findSchool.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑学校（微信端）
export function updateSchool(params) {
  return ax.post('/action/mod-xiaojiao/weixin/school/updateSchool.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询老师列表（微信端）
export function queryTeachers(params) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/queryTeachers.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//录入老师信息（微信端）
export function addTeacher(params) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/addTeacher.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除老师信息（微信端）
export function deleteTeacher(params) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/deleteTeacher.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑老师信息（微信端）
export function updateTeacher(params) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/updateTeacher.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询班级列表（微信端）
export function queryClasses(params) {
  return ax.post('/action/mod-xiaojiao/weixin/class/queryClasses.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑班级信息（微信端）
export function updateClass(params) {
  return ax.post('/action/mod-xiaojiao/weixin/class/updateClass.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增班级信息（微信端）
export function addClass(params) {
  return ax.post('/action/mod-xiaojiao/weixin/class/addClass.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除班级信息（微信端）
export function deleteClass(params) {
  return ax.post('/action/mod-xiaojiao/weixin/class/deleteClass.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生列表（微信端）
export function queryStudent(params) {
  return ax.post('/action/mod-xiaojiao/weixin/student/queryStudent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//录入学生信息（微信端）
export function addStudent(params) {
  return ax.post('/action/mod-xiaojiao/weixin/student/addStudent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑学生信息（微信端）
export function updateStudent(params) {
  return ax.post('/action/mod-xiaojiao/weixin/student/updateStudent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除学生信息（微信端）
export function deleteStudent(params) {
  return ax.post('/action/mod-xiaojiao/weixin/student/deleteStudent.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//批量导入学生（微信端）
export function addStudents(params) {
  return ax.post('/action/mod-xiaojiao/weixin/student/addStudents.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
