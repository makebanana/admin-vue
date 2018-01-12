import fetch from '@/util/fetch'
import formatLevel from '@/util/formatLevel'

const picType = {
  state: {
    isLoad: false,
    list: [],
    listMap: {}
  },

  mutations: {

    update (state, data) {
      let formatReturn = formatLevel(data)
      state.list = formatReturn[0]
      state.listMap = formatReturn[1]
      state.isLoad = true
    },

    add (state, data) {
      this.update(state, state.list.push(data))
    },

    edit ({ list, listMap }, data) {
      let tempList = list
      let itemMap = listMap[data.id]

      if (itemMap.length === 1) {
        tempList[itemMap[0]].name = data.name
      } else {
        tempList[itemMap[0]].children[itemMap[1]].name = data.name
      }

      list = tempList
    },

    del ({ list, listMap }, id) {
      let tempList = list
      let itemMap = listMap[id]

      if (itemMap.length === 1) {
        tempList.splice(itemMap[0], 1)
      } else {
        tempList[itemMap[0]].children.splice(itemMap[1], 1)
      }

      list = tempList
      delete listMap[id]
    }
  },

  actions: {

    getType ({ commit }) {
      fetch({
        url: '/api/pic/type'
      }).then(res => {
        commit('update', res.data.typeList)
      })
    },

    addType ({ commit }, label) {
      fetch({
        url: '/api/pic/type',
        type: 'POST',
        data: {
          label
        }
      }).then(res => {
        commit('add', {
          id: res.data.id,
          label
        })
      })
    },

    editType ({ commit }, { label, id }) {
      fetch({
        url: '/api/pic/type/' + id,
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
      fetch({
        url: '/api/pic/type/' + id,
        type: 'DELETE'
      }).then(res => {
        commit('del', id)
      })
    }
  }
}

export default picType
