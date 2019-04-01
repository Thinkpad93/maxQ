import ax from '../axios';

//预录入号码（新增学校微信端）
export function addLeaderInit(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/school/addLeaderInit.do', params, config)
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
export function findSchool(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/school/findSchool.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑学校（微信端）
export function updateSchool(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/school/updateSchool.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询老师列表（微信端）
export function queryTeachers(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/queryTeachers.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//录入老师信息（微信端）
export function addTeacher(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/addTeacher.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除老师信息（微信端）
export function deleteTeacher(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/deleteTeacher.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑老师信息（微信端）
export function updateTeacher(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/updateTeacher.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询班级列表（微信端）
export function queryClasses(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/class/queryClasses.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑班级信息（微信端）
export function updateClass(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/class/updateClass.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增班级信息（微信端）
export function addClass(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/class/addClass.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除班级信息（微信端）
export function deleteClass(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/class/deleteClass.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
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
export function addStudents(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/student/addStudents.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
