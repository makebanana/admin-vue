const picType = {
  state: {
    list: [],
    listMap: {}
  },

  mutations: {

    // 数据规范化  type只有两层
    formatList (data) {
      let list = []
      let listMap = {}
      data.forEach(item => {
        if (item.parentId === 0) {
          if (listMap[item.id]) {
            item.children = listMap[item.id][0].children
            list[listMap[item.id][0]] = item
          } else {
            item.children = []
            list.push(item)
            listMap[item.id] = [list.length - 1]
          }
        } else {
          let map = listMap[item.parentId]
          if (!map) {
            list.push({
              children: [item]
            })
            listMap[item.parentId] = [list.length - 1]
            listMap[item.id] = [list.length - 1, 0]
          } else {
            list[map[0]].children.push(item)
            listMap[item.id] = [map[0], list[map[0]].children - 1]
          }
        }
      })
      return [list, listMap]
    },

    update (state, data) {
      let formatReturn = this.formatList(data)
      state.list = formatReturn[0]
      state.listMap = formatReturn[1]
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
      this.$fetch({
        url: '/api/type'
      }).then(res => {
        commit('update', res.data.type)
      })
    },

    addType ({ commit }, label) {
      this.$fetch({
        url: '/api/type',
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
      this.$fetch({
        url: '/api/type/' + id,
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
      this.$fetch({
        url: '/api/type/' + id,
        type: 'DELETE'
      }).then(res => {
        commit('del', id)
      })
    }
  }
}

export default picType
