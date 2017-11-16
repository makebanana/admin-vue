const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router/router')

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

app.listen(7777, () => {
  console.log('[demo] request post is starting at port 7777')
})
