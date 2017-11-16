const router = require('koa-router')()

const login = require('./api/login')
const nav = require('./api/nav')

router.use('/', login.routes(), login.allowedMethods())
router.use('/', nav.routes(), nav.allowedMethods())

module.exports = router
