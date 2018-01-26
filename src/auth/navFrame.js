const navFrame = [
  {
    name: '相片管理',
    logo: 'el-icon-picture-outline',
    child: [
      {
        name: '新增相片',
        path: '/photo/add'
      },
      {
        name: '相片列表',
        path: '/photo/list'
      },
      {
        name: '分类管理',
        path: '/photo/type'
      }
    ]
  },
  {
    name: '用户管理',
    logo: 'el-icon-mobile-phone',
    child: [
      {
        name: '新增用户',
        path: '/user/add'
      },
      {
        name: '用户列表',
        path: '/user/list'
      }
    ]
  },
  {
    name: '活动管理',
    logo: 'el-icon-date',
    child: [
      {
        name: '新增活动',
        path: '/active/add'
      },
      {
        name: '活动列表',
        path: '/active/list'
      }
    ]
  },
  {
    name: '消息管理',
    logo: 'el-icon-message',
    child: [
      {
        name: '系统消息',
        path: '/message/message'
      },
      {
        name: '反馈建议',
        path: '/message/suggest'
      }
    ]
  },
  {
    name: '数据分析',
    logo: 'el-icon-printer',
    child: [
      {
        name: '相片分析',
        path: '/analysis/photo'
      },
      {
        name: '客户分析',
        path: '/analysis/customer'
      }
    ]
  },
  {
    name: '系统设置',
    logo: 'el-icon-setting',
    path: '/manager'
  }
]

export default navFrame
