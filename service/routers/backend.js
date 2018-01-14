const {
  BackendAuth,
  BackendManager,
  BackendPicType,
  BackendUser
} = require('../controllers/backend.export')

const router = require('koa-router')()

router

  // 管理员相关
  .post('/server/login', BackendManager.login)
  .get('/server/manager', BackendManager.list)
  .get('/server/manager/:id', BackendManager.detail)
  .post('/server/manager', BackendManager.add)
  .put('/server/manager/:id', BackendManager.update)
  .delete('/server/manager/:id', BackendManager.update)

  // 权限相关
  .get('/server/auth', BackendAuth.list)

  // 照片分类相关
  .get('/server/pic/type', BackendPicType.list)
  .post('/server/pic/type', BackendPicType.add)
  .put('/server/pic/type/:id', BackendPicType.update)
  .delete('/server/pic/type/:id', BackendPicType.del)

  // 客户相关
  .get('/server/user', BackendUser.list)
  .get('/server/user/:id', BackendUser.detail)
  .post('/server/user', BackendUser.add)
  .put('/server/user/:id', BackendUser.update)
  .delete('/server/user/:id', BackendUser.del)

module.exports = router
