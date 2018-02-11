/*
* 动态导航栏 tab对应
*/

const authConfig = {
  '10001': ['/user/list'],
  '10002': ['/user/add', '/user/:id'],
  '20001': ['/photo/list'],
  '20002': ['/photo/add', '/photo/:id', '/photo/type'],
  '30001': ['/message/message'],
  '30002': ['/message/suggest'],
  '40001': ['/active/list'],
  '40002': ['/active/add', '/active/:id'],
  '50001': ['/analysis/photo'],
  '50002': ['/analysis/customer'],
  '60000': ['/manager', '/manager/:id', 'manager/add']
}

export default authConfig
