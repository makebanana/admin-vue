const router = require('koa-router')()

let list = [
  {
    value: 123,
    label: '相片1'
  },
  {
    value: 124,
    label: '相片2'
  },
  {
    value: 125,
    label: '相片3'
  }
]

module.exports = router.get('pic/type', async (ctx) => {
  ctx.body = {
    code: 200,
    message: '',
    data: {
      typeList: list,
      resultCount: list.length
    }
  }
}).post('pic/type', async (ctx) => {
  ctx.body = {
    code: 200,
    message: '',
    id: Math.ceil(Math.random() * 90) + Math.ceil(Math.random() * 8)
  }
})
