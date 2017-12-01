import fetch from '@/util/fetch'
import turnAuthToAllowedAndNav from '@/auth/index'

let sessionAuthData = JSON.parse(sessionStorage.getItem('V_auth')) ? turnAuthToAllowedAndNav(JSON.parse(sessionStorage.getItem('V_auth'))) : {}

const app = {
  state: {
    allowedList: sessionAuthData.allowedList || [],
    navList: sessionAuthData.navList || []
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
      sessionStorage.removeItem('V_auth')
      state.allowedList = []
      state.navList = []
    },

    // 更新权限
    updateAuth (state, data) {
      state.allowedList = data.allowedList
      state.navList = data.navList
      console.log(state.navList)
    }
  },

  actions: {
    updateAuthAsync ({ commit }, cb) {
      fetch({ url: '/api/auth' }).then(res => {
        sessionStorage.setItem('V_auth', JSON.stringify(res.data.authMenus))
        commit('updateAuth', turnAuthToAllowedAndNav(res.data.authMenus))
        cb && cb()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

export default app
