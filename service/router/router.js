const router = require('koa-router')()

const login = require('./api/login')
const auth = require('./api/auth')
const user = require('./api/user')

router.use('/api/', login.routes(), login.allowedMethods())
router.use('/api/', auth.routes(), auth.allowedMethods())
router.use('/api/', user.routes(), user.allowedMethods())

module.exports = router
