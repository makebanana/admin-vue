import fetch from '@/util/fetch'
import turnAuthToNavAndAllowed from '@/tab/index'
import pathToRegexp from 'path-to-regexp'
import tabConfig from '@/tab/tabConfig'

let sessionAuthData = turnAuthToNavAndAllowed(JSON.parse(sessionStorage.getItem('V_auth') || JSON.stringify([])))

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

    // 找到path 对应的模块
    // 新增tab
    updateTab (state, config) {
      // path 用来匹配 authMap.js 配置的路由
      // realPath 用来保持 tab 的唯一性，也就造就了在列表页面多开详情页面的可能
      let path = typeof config === 'string' ? config : config.path
      let realPath = tabConfig[path] ? path : '/nofind'
      if (config && config.query) {
        let toPath = pathToRegexp.compile(path)
        realPath = toPath(config.query)
      }

      // 当不存在历史
      if (!state.tabsList.some(item => item.path === realPath)) {
        let newTab = Object.assign({}, tabConfig[path])

        // 是否需要自定义名称
        if (config.name) {
          newTab.name = config.name
        }

        // 是否需要传递参数
        if (config.query) {
          newTab.query = config.query
        }
        newTab.path = realPath
        state.tabsList.push(newTab)
      }
      state.activePath = realPath
    },

    // 删除tab
    removeTab (state, path) {
      let delIndex
      let delpath
      state.tabsList = state.tabsList.filter((item, i) => {
        if (item.path === path) {
          delIndex = i
          delpath = path
        }
        return item.path !== path
      })

      // 删除选中
      if (path === delpath) {
        if (state.tabsList.length) {
          state.activePath = state.tabsList[delIndex] ? state.tabsList[delIndex].path : state.tabsList[delIndex - 1].path
        } else {
          state.activePath = '/'
        }
      }
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
