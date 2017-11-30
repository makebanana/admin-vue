import PathTabsView from './src/index'
import Events from './utils/events'

/* istanbul ignore next */
PathTabsView.install = function (Vue) {
  Vue.component(PathTabsView.name, PathTabsView)
  Vue.mixin({
    created: function () {
      const tabPath = this.$attrs.tabPath
      const tabQuery = this.$attrs.tabQuery
      const $tab = {}
      Object.defineProperties($tab, {
        path: {
          configurable: false,
          writable: false,
          value: tabPath
        },
        query: {
          configurable: false,
          writable: false,
          value: tabQuery
        },
        open: {
          configurable: false,
          writable: false,
          value: function (config) {
            Events.emit('PATHTABS_ADD', config)
          }
        },
        reload: {
          configurable: false,
          writable: false,
          value: function (path = tabPath) {
            Events.emit('PATHTABS_RELOAD', path)
          }
        },
        close: {
          configurable: false,
          writable: false,
          value: function (path = tabPath) {
            Events.emit('PATHTABS_CLOSE', path)
          }
        },
        closeOther: {
          configurable: false,
          writable: false,
          value: function (path = tabPath) {
            Events.emit('PATHTABS_CLOSEOTHER', path)
          }
        },
        lock: {
          configurable: false,
          writable: false,
          value: function (path = tabPath) {
            Events.emit('PATHTABS_LOCK', path)
          }
        },
        unlock: {
          configurable: false,
          writable: false,
          value: function (path = tabPath) {
            Events.emit('PATHTABS_UNLOCK', tabPath)
          }
        }
      })
      this.$tab = $tab
    }
  })
}

export default PathTabsView
