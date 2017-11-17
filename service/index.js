const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router/router')

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

function mockService (serviceHost) {
  app.listen(serviceHost, () => {
    console.log(`[service] mock service running and post is starting at port ${serviceHost}`)
  })
}

module.exports = mockService
