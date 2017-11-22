const router = require('koa-router')()

let userData = [
  {
    id: 1201,
    name: 'A1201',
    mobile: 13777841201
  },
  {
    id: 2333,
    name: 'A2333',
    mobile: 13777842333
  },
  {
    id: 3765,
    name: 'A3765',
    mobile: 13777843765
  },
  {
    id: 4001,
    name: 'A4001',
    mobile: 13777844001
  },
  {
    id: 4527,
    name: 'A4527',
    mobile: 13777844527
  },
  {
    id: 5678,
    name: 'A5678',
    mobile: 13777845678
  },
  {
    id: 666,
    name: 'A666',
    mobile: 1377784666
  },
  {
    id: 7727,
    name: 'A7727',
    mobile: 13777847727
  }
]

module.exports = router.get('user', async (ctx) => {
  ctx.body = {
    code: 200,
    data: {
      userList: userData,
      pageNo: 1,
      pageCount: userData.length,
      resultCount: userData.length
    }
  }
}).get('user/:uid', async (ctx) => {
  let uid = parseInt(ctx.params.uid)
  let user = {
    id: Date.now(),
    name: uid,
    mobile: uid * 10000
  }
  userData.some(item => {
    if (item.id === uid) {
      user = item
    }
    return item.id === uid
  })
  ctx.body = {
    code: 200,
    data: {
      user: user
    }
  }
})
