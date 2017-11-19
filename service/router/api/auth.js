const router = require('koa-router')()

module.exports = router.get('auth', async (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      authMenus: [
        {
          parentId: 0,
          id: 10000,
          name: 'user'
        },
        {
          parentId: 10000,
          id: 10001,
          name: 'user_list'
        },
        {
          parentId: 10000,
          id: 10002,
          name: 'user_add_edit'
        },
        {
          parentId: 0,
          id: 20000,
          name: 'version'
        },
        {
          parentId: 20000,
          id: 20001,
          name: 'version_list'
        },
        {
          parentId: 0,
          id: 90000,
          name: 'system'
        }
      ]
    }
  }
})
