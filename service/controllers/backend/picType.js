let list = [
  {
    parentId: 0,
    id: 1,
    label: '写真'
  },
  {
    parentId: 0,
    id: 2,
    label: '婚纱'
  },
  {
    parentId: 0,
    id: 3,
    label: '模卡'
  },
  {
    parentId: 0,
    id: 4,
    label: '全家福'
  },
  {
    parentId: 0,
    id: 5,
    label: '其他'
  },
  {
    parentId: 1,
    id: 6,
    label: '森系'
  },
  {
    parentId: 1,
    id: 7,
    label: '街拍'
  },
  {
    parentId: 2,
    id: 8,
    label: '湖边'
  },
  {
    parentId: 2,
    id: 9,
    label: '星光'
  },
  {
    parentId: 3,
    id: 10,
    label: '复古'
  },
  {
    parentId: 3,
    id: 11,
    label: '时尚'
  },
  {
    parentId: 4,
    id: 12,
    label: '复古'
  },
  {
    parentId: 4,
    id: 13,
    label: '心在'
  },
  {
    parentId: 5,
    id: 14,
    label: '形象照'
  },
  {
    parentId: 5,
    id: 15,
    label: '结婚证'
  }
]

module.exports = class PicTypeController {
  static list (ctx) {
    ctx.success({
      data: {
        list
      }
    })
  }

  static add (ctx) {
    ctx.success({
      message: '新增成功',
      data: {
        id: 123
      }
    })
  }

  static async update (ctx) {
    // let { name, password } = ctx.request.body
    ctx.success({
      message: '修改成功',
      data: {}
    })
  }

  static async del (ctx) {
    // let id = ctx.request.body.id
    ctx.success({
      message: '删除成功',
      data: {}
    })
  }
}
