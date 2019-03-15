import ax from '../axios';

//学生作品查询
export function queryWorksCollection(params, config) {
  return ax.post('/action/mod-xiaojiao/works/queryWorksCollection.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//学生作品查询
export function queryWorksDetail(params) {
  return ax.post('/action/mod-xiaojiao/works/queryWorksDetail.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作品上传
export function uploadWorks(params) {
  return ax.post('/action/mod-xiaojiao/works/uploadWorks.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作品审核
export function checkWorks(params) {
  return ax.post('/action/mod-xiaojiao/works/checkWorks.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作品推荐
export function recommendWorks(params) {
  return ax.post('/action/mod-xiaojiao/works/recommendWorks.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//作品屏端播放查询
export function queryWorksTerminal(params) {
  return ax.post('/action/mod-xiaojiao/works/queryWorksTerminal.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
