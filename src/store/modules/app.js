import fetch from '@/util/fetch'
import turnAuthToNavAndAllowed from '@/util/authMap'

let sessionAuthData = turnAuthToNavAndAllowed(JSON.parse(sessionStorage.getItem('V_auth') || '"{}"'))

const app = {
  state: {
    allowedList: sessionAuthData.allowedList || [],
    navList: sessionAuthData.navList || [],
    activePath: '/',
    tabsList: []
  },

  getters: {
    canIManager: (state, getters) => (authKey) => {
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
      state.activePath = '/'
      state.tabsList = []
    },

    // 更新权限
    updateAuth (state, data) {
      state.allowedList = data.allowedList
      state.navList = data.navList
    },

    // 设置当前选中
    updateActivePath (state, path) {
      state.activePath = path
    },

    // 新增tab
    updateTab (state, path) {
      // 当不存在历史
      if (!state.tabsList.some(item => item.path === path)) {
        let newTab
        // coding 用 path-to-regexp 逆推 命中 , 先处理 no query path
        state.navList.some(big => {
          if (big.path === path && !big.child.length) {
            newTab = big
            return true
          }

          return big.child.some(child => {
            if (child.path === path) {
              newTab = child
            }
            return child.path === path
          })
        })

        // 未命中
        if (!newTab) {
          // 去404
        }
        state.tabsList.push(newTab)
      }
      state.activePath = path
    },

    // 删除tab
    removeTab (state, path) {
      state.tabsList = state.tabsList.filter(item => item.path !== path)
    }
  },

  actions: {
    updateAuthAsync ({ commit }, cb) {
      fetch({ url: '/api/auth' }).then(res => {
        sessionStorage.setItem('V_auth', JSON.stringify(res.data.authMenus))
        commit('updateAuth', turnAuthToNavAndAllowed(res.data.authMenus))
        cb && cb()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

export default app
