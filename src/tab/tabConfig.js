/*
* tab 显示路由分配
* 参数说明
* @params name       tab name
* @params component  tab component
*/
const noFind = r => require.ensure([], () => r(require('@/pages/NoFind')), 'chunk_nofind')
const userList = r => require.ensure([], () => r(require('@/pages/User/List')), 'chunk_user_list')
const userAdd = r => require.ensure([], () => r(require('@/pages/User/Add')), 'chunk_user_add')
const userDetail = r => require.ensure([], () => r(require('@/pages/User/Detail')), 'chunk_user_detail')
const photoList = r => require.ensure([], () => r(require('@/pages/Photo/List')), 'chunk_photo_list')
const photoType = r => require.ensure([], () => r(require('@/pages/Photo/Type')), 'chunk_photo_type')
const photoAdd = r => require.ensure([], () => r(require('@/pages/Photo/List')), 'chunk_photo_add')
const message = r => require.ensure([], () => r(require('@/pages/Message/Message')), 'chunk_message_message')
const suggest = r => require.ensure([], () => r(require('@/pages/Message/suggest')), 'chunk_message_suggest')
const activeList = r => require.ensure([], () => r(require('@/pages/Activity/List')), 'chunk_active_list')
const activeAdd = r => require.ensure([], () => r(require('@/pages/Activity/Add')), 'chunk_active_add')
const activeEdit = r => require.ensure([], () => r(require('@/pages/Activity/Edit')), 'chunk_active_edit')
const analysisPhoto = r => require.ensure([], () => r(require('@/pages/Analysis/Photo')), 'chunk_analysis_photo')
const analysisCustomer = r => require.ensure([], () => r(require('@/pages/Analysis/Customer')), 'chunk_analysis_customer')
const manager = r => require.ensure([], () => r(require('@/pages/System/Manager')), 'chunk_system_manager')
const tabConfig = {
  '/nofind': {
    name: '没有找到',
    component: noFind
  },
  '/user/add': {
    name: '新增用户',
    component: userAdd
  },
  '/user/list': {
    name: '用户列表',
    component: userList
  },
  '/user/:id': {
    name: '用户详情',
    component: userDetail
  },
  '/photo/add': {
    name: '新增相片',
    component: photoAdd
  },
  '/photo/list': {
    name: '相片列表',
    component: photoList
  },
  '/photo/type': {
    name: '分类列表',
    component: photoType
  },
  '/photo/:id': {
    name: '相片详情',
    component: photoList
  },
  '/message/message': {
    name: '系统消息',
    component: message
  },
  '/message/suggest': {
    code: 30002,
    name: '反馈建议',
    component: suggest,
    isNav: true
  },
  '/active/add': {
    name: '新增活动',
    component: activeAdd
  },
  '/active/list': {
    name: '活动列表',
    component: activeList
  },
  '/active/:id': {
    name: '活动详情',
    component: activeEdit
  },
  '/analysis/photo': {
    name: '相片分析',
    component: analysisPhoto
  },
  '/analysis/customer': {
    name: '客户分析',
    component: analysisCustomer
  },
  '/manager': {
    name: '管理员管理',
    component: manager
  }
}

export default tabConfig
