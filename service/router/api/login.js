const router = require('koa-router')()
const tokenMaker = require('jsonwebtoken')

function makeToken (key) {
  return tokenMaker.sign({msg: 'manager login token'}, key, {
    expiresIn: 60 * 60 * 24
  })
}

module.exports = router.post('api/login', async (ctx) => {
  let { mobile } = ctx.request.body

  ctx.body = {
    code: 200,
    data: {
      authorization: makeToken(mobile),
      userId: 123,
      name: '用户' + mobile
    }
  }
})
