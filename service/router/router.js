const router = require('koa-router')()

const login = require('./api/login')
const nav = require('./api/nav')

router.use('/api/', login.routes(), login.allowedMethods())
router.use('/api/', nav.routes(), nav.allowedMethods())

module.exports = router
