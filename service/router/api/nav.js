const router = require('koa-router')()

module.exports = router.get('nav', async (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      authMenus: [
        {
          id: 10000,
          name: '用户管理',
          logo: 'el-icon-mobile-phone',
          child: [
            {
              id: 10001,
              name: '新增用户'
            },
            {
              id: 10003,
              name: '用户列表'
            }
          ]
        },
        {
          id: 40000,
          name: '版本管理',
          logo: 'el-icon-tickets',
          child: [
            {
              id: 40001,
              name: '新增版本'
            }
          ]
        },
        {
          id: 90000,
          name: '系统配置',
          logo: 'el-icon-setting',
          child: []
        }
      ]
    }
  }
})
