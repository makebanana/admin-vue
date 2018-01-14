const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')()
const logger = require('koa-logger')
const session = require('koa-session')
const path = require('path')
// const koaBody = require('koa-body')
// const co = require('co')
// const db = require('./rest/models/db')
// const json = require('koa-json')

const backendRouter = require('./routers/backend')

// cookies
app.keys = ['moge:secret']
const CONFIG = {
  key: 'moge',
  maxAge: 604800000,  // 7天
  overwrite: true,
  signed: true
}

app.use(convert(logger()))
   .use(convert(session(CONFIG, app)))
   .use(require('koa-static')(path.resolve(__dirname) + '/public'))

onerror(app)

// 使用ctx.body解析中间件
app.use(bodyParser)

// app.use(koaBody({
//   formLimit: 1048576,  // 最大1M
//   textLimit: 1048576,
//   formidable:{
//     keepExtensions: true, // 带拓展名上传，否则上传的会是二进制文件而不是图片文件
//     onFileBegin(name,file){
//       file.path = __dirname+'/public/images/'+file.name // 重命名上传文件
//     },
//     uploadDir: __dirname+'/public/images'},  // 输出到images文件夹
//   multipart:true,
// }))

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// router
app.use(require('./middlewares/response'))
app.use(require('./middlewares/filter'))
app.use(backendRouter.routes()).use(backendRouter.allowedMethods())

// response
app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
  ctx.render('error', { message: ' 服务器错误!', error: err })
})

// start
function mockService (serviceHost) {
  app.listen(serviceHost, () => {
    console.log(`[service] mock service running and post is starting at port ${serviceHost}`)
  })
}

module.exports = mockService
