const router = require('koa-router')()

const login = require('./api/login')
const auth = require('./api/auth')
const user = require('./api/user')
const picType = require('./api/picType')

router.use('/api/', login.routes(), login.allowedMethods())
router.use('/api/', auth.routes(), auth.allowedMethods())
router.use('/api/', user.routes(), user.allowedMethods())
router.use('/api/', picType.routes(), picType.allowedMethods())

module.exports = router
