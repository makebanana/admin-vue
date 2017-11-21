/**
* 参数说明
* @params name       侧边栏导航、以及 tabs 显示的title
* @params path       该权限对应的配置路径
* @params isNav      是否需要出现在侧边栏
* @params child      出现在侧边栏的子类，用于大类
*/
const authMap = {
  '10000': {
    name: '用户管理',
    path: '/user',
    isNav: true,
    child: []
  },
  '10001': [
    {
      name: '用户列表',
      path: '/user/list',
      component: r => require.ensure([], () => r(require('@/pages/User/List')), 'chunk_user_list'),
      isNav: true
    }
  ],
  '10002': [
    {
      name: '新增用户',
      path: '/user/add',
      component: r => require.ensure([], () => r(require('@/pages/User/Add')), 'chunk_user_add'),
      isNav: true
    },
    {
      name: '用户详情',
      path: '/user/{uid}',
      component: r => require.ensure([], () => r(require('@/pages/User/Detail')), 'chunk_user_detail')
    }
  ],
  '20000': {
    name: '版本管理',
    path: '/version',
    isNav: true,
    child: []
  },
  '20001': [
    {
      name: '版本列表',
      path: '/version/list',
      component: r => require.ensure([], () => r(require('@/pages/Version/List')), 'chunk_version_list'),
      isNav: true
    }
  ],
  '90000': {
    name: '系统管理',
    path: '/system',
    component: r => require.ensure([], () => r(require('@/pages/System/system')), 'chunk_system'),
    isNav: true,
    child: []
  }
}

// 为store.auth 提供数据
function turnAuthToNavAndAllowed (auth = []) {
  let tempObj = {}
  let navArr = []
  let allowedArr = []

  /**
  * 目标auth 格式
  * [
  *   {
  *     name: 'useradd',
  *     parentId: 10000,
  *     id: 10001
  *   }
  * ]
  */
  auth.forEach(item => {
    let navItem = authMap[item.id]

    allowedArr.push(item.name)

    // 为父权限 未被注册过
    if (item.parentId === 0 && !tempObj[item.id]) {
      // 锁定index
      navItem.child = []
      navArr.push(navItem)
      tempObj[item.id] = navArr.length - 1
      return
    }

    // 不是父权限 父权限未注册
    if (item.parentId !== 0) {
      // 如果之前没有父权限，现为其注册一个

      if (typeof tempObj[item.parentId] === 'undefined') {
        authMap[item.parentId] = []
        navArr.push(authMap[item.parentId])
        tempObj[item.parentId] = navArr.length - 1
      }

      // 加入子
      navArr[tempObj[item.parentId]].child.push(...navItem)
    }
  })
  return {
    allowedList: allowedArr,
    navList: navArr
  }
}

export default turnAuthToNavAndAllowed
