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
//下载Excel模板
export function teacherDownloadExcelTemp(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/downloadExcelTemp.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//批量导入老师（微信）
export function teacherBatchAdd(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/teacher/teacherBatchAdd.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询班级列表（微信端）
export function querySchoolClass(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/class/querySchoolClass.do', params, config)
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
//添加学生点评
export function addComment(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/comment/addComment.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生点评列表
export function queryCommentList(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/comment/queryCommentList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生列表
export function queryStudentList(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/comment/queryStudentList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//修改学生点评
export function updateComment(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/comment/updateComment.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除学生点评
export function deleteComment(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/comment/deleteComment.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询学生点评（单条）
export function queryComment(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/comment/queryComment.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询系统默认行为
export function queryAllAction(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/queryAllAction.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑系统默认行为
export function updateDefault(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/updateDefault.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除系统默认行为
export function deleteAction(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/deleteAction.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增系统默认行为
export function addAction(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/action/addAction.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//查询所有奖项
export function queryPrizeDefual(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/prize/queryPrizeDefual.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑奖项
export function updatePrize(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/prize/updatePrize.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除奖项
export function deletePrize(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/prize/deletePrize.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增奖项
export function addPrize(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/prize/addPrize.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//用户统计
export function statistics(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/statistics/statistics.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//班级统计
export function classStatistics(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/statistics/classStatistics.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
