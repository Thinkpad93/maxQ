import ax from '../axios';

//角色列表
export function queryRoleList(params) {
  return ax.post('/action/mod-xiaojiao/role/queryRoleList.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//新增角色
export function addRole(params) {
  return ax.post('/action/mod-xiaojiao/role/addRole.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//编辑角色
export function updateRole(params) {
  return ax.post('/action/mod-xiaojiao/role/updateRole.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
//删除角色
export function deleteRole(params) {
  return ax.post('/action/mod-xiaojiao/role/deleteRole.do', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
