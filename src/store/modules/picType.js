import fetch from '@/util/fetch'
import formatLevel from '@/util/formatLevel'

const picType = {
  state: {
    history: [],
    list: [],
    listMap: {}
  },

  mutations: {

    update (state, data) {
      let formatReturn = formatLevel(data)
      state.history = data
      state.list = formatReturn[0]
      state.listMap = formatReturn[1]
      state.isLoad = true
    },

    add ({ history }, data) {
      history.push(data)
      this.commit('update', history)
    },

    edit ({ list, listMap, history }, data) {
      let tempList = list
      let tempHistroy = history
      let itemMap = listMap[data.id]

      if (itemMap.length === 1) {
        tempList[itemMap[0]].label = data.label
      } else {
        tempList[itemMap[0]].children[itemMap[1]].label = data.label
      }

      list = tempList

      tempHistroy.some(item => {
        if (item.id === data.id) {
          item = data
          return true
        }
      })

      history = tempHistroy
    },

    del ({ list, listMap, history }, tid) {
      let id = parseInt(tid)
      history = history.filter(type => type.id !== id)

      this.commit('update', history)
    }
  },

  actions: {

    getType ({ commit }) {
      fetch({
        url: '/server/pic/type'
      }).then(res => {
        commit('update', res.data.list)
      })
    },

    addType ({ commit }, { parentId, label }) {
      return fetch({
        url: '/server/pic/type',
        type: 'POST',
        data: {
          label,
          parentId
        }
      }).then(res => {
        commit('add', {
          label,
          parentId,
          id: res.data.id,
          _id: res.data._id,
          count: 0
        })
      })
    },

    editType ({ commit }, { label, id }) {
      return fetch({
        url: '/server/pic/type/' + id,
        type: 'PUT',
        data: {
          label
        }
      }).then(res => {
        commit('edit', {
          id,
          label
        })
      })
    },

    delType ({ commit }, id) {
      return fetch({
        url: '/server/pic/type/' + id,
        type: 'DELETE'
      }).then(res => {
        commit('del', id)
      })
    }
  }
}

export default picType
