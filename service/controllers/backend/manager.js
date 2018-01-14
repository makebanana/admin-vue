const tokenMaker = require('jsonwebtoken')
// const AdminUserModel = mongoose.model('AdminUser')

function makeToken (key) {
  return tokenMaker.sign({msg: 'manager login token'}, key, {
    expiresIn: 60 * 60 * 24
  })
}

module.exports = class ManagerController {
  static async login (ctx) {
    let { mobile, password } = ctx.request.body

    if (!mobile) {
      return ctx.error({
        message: '请输入用户名!'
      })
    }

    if (!password) {
      return ctx.error({
        message: '请输入密码!'
      })
    }

    // const result = await AdminUserModel.findOne({name,password: md5(password)})
    // if (!result) {
    //   return ctx.error({
    //     message: '用户名或密码错误!'
    //   })
    // }

    ctx.success({
      message: '登陆成功',
      data: {
        authorization: makeToken(mobile),
        id: 123,
        name: mobile
      }
    })
  }

  static async list (ctx) {
    // authorization
    // crx.error({
    //  message: '没有查看权限'
    // })
    ctx.success({
      message: '删除成功',
      data: {
        list: [
          {
            id: 123,
            name: 'admin1',
            mobile: '13777847949'
          }
        ]
      }
    })
  }

  static async detail (ctx) {
    let id = ctx.request.body.id
    ctx.success({
      message: '登陆成功',
      data: {
        id: id,
        name: '12312',
        mobile: '13777847949',
        createTime: Date.now(),
        lastLoginTime: Date.now(),
        auth: []
      }
    })
  }

  static async add (ctx) {
    // let { mobile, password, name, anth } = ctx.request.body
    let { mobile, password } = ctx.request.body

    ctx.success({
      message: '添加成功',
      data: {
        userId: 123,
        name: mobile,
        password
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
