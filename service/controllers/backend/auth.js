let auth = [
  {
    parentId: 0,
    id: 10000,
    name: 'user'
  },
  {
    parentId: 10000,
    id: 10001,
    name: 'user_list'
  },
  {
    parentId: 10000,
    id: 10002,
    name: 'user_add_edit'
  },
  {
    parentId: 0,
    id: 20000,
    name: 'photo'
  },
  {
    parentId: 20000,
    id: 20001,
    name: 'photo_list'
  },
  {
    parentId: 20000,
    id: 20002,
    name: 'photo_manager'
  },
  {
    parentId: 0,
    id: 30000,
    name: 'message'
  },
  {
    parentId: 30000,
    id: 30001,
    name: 'message_message'
  },
  {
    parentId: 30000,
    id: 30002,
    name: 'message_suggest'
  },
  {
    parentId: 0,
    id: 40000,
    name: 'active'
  },
  {
    parentId: 40000,
    id: 40001,
    name: 'active_list'
  },
  {
    parentId: 40000,
    id: 40002,
    name: 'active_add_edit'
  },
  {
    parentId: 0,
    id: 50000,
    name: 'analysis'
  },
  {
    parentId: 50000,
    id: 50001,
    name: 'analysis_photo'
  },
  {
    parentId: 50000,
    id: 50002,
    name: 'analysis_customer'
  },
  {
    parentId: 0,
    id: 60000,
    name: 'manager'
  }
]

module.exports = class AuthController {
  static list (ctx) {
    // let id = ctx.cookies.get('manager_id')
    ctx.success({
      data: {
        auth
      }
    })
  }
}
