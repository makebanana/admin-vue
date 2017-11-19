const router = require('koa-router')()

const login = require('./api/login')
const auth = require('./api/auth')

router.use('/api/', login.routes(), login.allowedMethods())
router.use('/api/', auth.routes(), auth.allowedMethods())

module.exports = router
