import PathTabs from '../tabs/index'
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
    component: noFind,
    breadcrumb: ['未找到目标页面']
  },
  '/user/add': {
    name: '新增用户',
    component: userAdd,
    breadcrumb: ['用户管理', '新增用户']
  },
  '/user/list': {
    name: '用户列表',
    component: userList,
    breadcrumb: ['用户管理', '用户列表']
  },
  '/user/:id': {
    name: '用户详情',
    component: userDetail,
    breadcrumb: ['用户管理', '用户详情']
  },
  '/photo/add': {
    name: '新增相片',
    component: photoAdd,
    breadcrumb: ['相片管理', '新增相片']
  },
  '/photo/list': {
    name: '相片列表',
    component: photoList,
    breadcrumb: ['相片管理', '相片列表']
  },
  '/photo/type': {
    name: '分类列表',
    component: photoType,
    breadcrumb: ['相片管理', '分类列表']
  },
  '/photo/:id': {
    name: '相片详情',
    component: photoList,
    breadcrumb: ['相片管理', '相片详情']
  },
  '/message/message': {
    name: '系统消息',
    component: message,
    breadcrumb: ['消息管理', '系统消息']
  },
  '/message/suggest': {
    name: '反馈建议',
    component: suggest,
    breadcrumb: ['消息管理', '反馈建议']
  },
  '/active/add': {
    name: '新增活动',
    component: activeAdd,
    breadcrumb: ['活动管理', '新增活动']
  },
  '/active/list': {
    name: '活动列表',
    component: activeList,
    breadcrumb: ['活动管理', '活动列表']
  },
  '/active/:id': {
    name: '活动详情',
    component: activeEdit,
    breadcrumb: ['活动管理', '活动详情']
  },
  '/analysis/photo': {
    name: '相片分析',
    component: analysisPhoto,
    breadcrumb: ['分析管理', '相片分析']
  },
  '/analysis/customer': {
    name: '客户分析',
    component: analysisCustomer,
    breadcrumb: ['分析管理', '客户分析']
  },
  '/manager': {
    name: '管理员管理',
    component: manager,
    breadcrumb: ['管理员管理']
  }
}
PathTabs.tabConfig = tabConfig
export default PathTabs
