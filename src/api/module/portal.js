import ax from '../axios'

//查询学校门户网站
export function queryPortalWeb(params) {
  return ax.post('/action/mod-xiaojiao/portal/queryPortalWeb.do', params)
    .then(res => res.data)
    .catch(e => console.log(e))
}
//查询学校门户网站菜单
export function queryPortalWebMenu(params) {
  return ax.post('/action/mod-xiaojiao/portal/queryPortalWebMenu.do', params)
    .then(res => res.data)
    .catch(e => console.log(e))
}
//查询学校门户网站菜单内容
export function queryPortalWebinfo(params) {
  return ax.post('/action/mod-xiaojiao/portal/queryPortalWebinfo.do', params)
    .then(res => res.data)
    .catch(e => console.log(e))
}
//保存学校门户网站菜单内容
export function savePortalWebInfo(params, config) {
  return ax.post('/action/mod-xiaojiao/portal/savePortalWebInfo.do', params, config)
    .then(res => res.data)
    .catch(e => console.log(e))
}
//删除学校门户网站菜单
export function deletePortalWeb(params) {
  return ax.post('/action/mod-xiaojiao/portal/deletePortalWeb.do', params)
    .then(res => res.data)
    .catch(e => console.log(e))
}
