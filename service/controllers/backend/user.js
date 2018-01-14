let userList = [
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

module.exports = class UserController {
  static list (ctx) {
    ctx.success({
      data: {
        userList,
        pageNo: 1,
        recordTotal: 100,
        pageCount: userList.length,
        resultCount: userList.length
      }
    })
  }

  static detail (ctx) {
    let id = parseInt(ctx.params.id)

    let user = {
      id: Date.now(),
      name: id,
      mobile: id * 10000
    }

    userList.some(item => {
      if (item.id === id) {
        user = item
      }
      return item.id === id
    })

    ctx.success({
      data: {
        user
      }
    })
  }

  static add (ctx) {
    ctx.success({
      message: '新增成功',
      data: {
        id: 123
      }
    })
  }

  static async update (ctx) {
    // let { name, password } = ctx.request.body
    ctx.success({
      message: '修改成功',
      data: {}
    })
  }

  static async del (ctx) {
    // let id = ctx.request.body.id
    ctx.success({
      message: '删除成功',
      data: {}
    })
  }
}
