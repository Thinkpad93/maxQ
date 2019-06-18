import ax from '../axios';

//新增试卷视频
export function addPaperVideo(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/addPaperVideo.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//视频列表查询
export function queryPaperList(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/queryPaperList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//年级查询
export function queryGrade(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/queryGrade.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//课程查询
export function queryLesson(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/queryLesson.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除试卷
export function deletePaperId(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/deletePaperId.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//修改试卷信息查询
export function queryDetailId(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/queryDetailId.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//修改试卷
export function updatePaper(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/updatePaper.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//上传视频
export function fileUploadVideo(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/fileUploadVideo.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//考试阶段列表查询
export function queryStudentStageList(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/queryStudentStageList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//班级学生测试科目成绩录入查询
export function studentScoreList(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/studentScoreList.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除阶段年级
// export function queryStudentStageList(params, config) {
//   return ax.post('/action/mod-xiaojiao/weixin/paper/queryStudentStageList.do', params, config)
//     .then(res => res.data)
//     .catch(e => console.log(e));
// }
//课程查询
export function queryClassLesson(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/queryClassLesson.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//成绩录入
export function addStage(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/addStage.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//成绩录入
export function addStageScore(params, config) {
  return ax.post('/action/mod-xiaojiao/weixin/paper/addStageScore.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
