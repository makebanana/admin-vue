const app = {
  state: {
    allowedList: []
  },

  getters: {
    canIManager: (state, getters) => authKey => {
      return state.allowedList.some(item => item === authKey)
    }
  },

  mutations: {
    // 退出，取消全部
    userLogout (state) {
      sessionStorage.removeItem('V_accessToken')
      sessionStorage.removeItem('V_userId')
      state.navList = []
    },

    // 更新权限
    updateAuth (state, data) {
      state.allowedList = data
    }
  }
}

export default app
