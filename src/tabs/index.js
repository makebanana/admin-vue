import { assert } from './utils/log'
import Events from './utils/events'
import install from './src/install'

export default class PathTab {
  constructor (options) {
    this.pathMap = []
    this.defaultTabs = []
    this.defaultPath = ''
    this.noMatch = {}

    assert(Array.isArray(options.path), 'you should set Array for path')
    options.path.forEach(item => {
      item.isLook = Boolean(item.isLook)
      this.pathMap.push(item)

      if (item.isDefault) {
        this.defaultTabs.push(item)
        this.defaultPath = item.path
      }

      if (item.isNoMatch && !this.noMatch.path) {
        this.noMatch = item
      }
    })

    this.noMatch = this.noMatch.path ? this.noMatch : {
      path: 'vue_pathtab_nomatch',
      name: 'can find',
      component: <div>404</div>,
      isLock: false
    }
  }

  beforeOpen (to, from, next) {
    next()
  }

  open (config) {
    Events.emit('PATHTABS_ADD', config)
  }

  reload (path = this.path) {
    Events.emit('PATHTABS_RELOAD', path)
  }

  close (path = this.path) {
    Events.emit('PATHTABS_CLOSE', path)
  }

  closeOther (path = this.path) {
    Events.emit('PATHTABS_CLOSEOTHER', path)
  }

  lock (path = this.path) {
    Events.emit('PATHTABS_LOCK', path)
  }

  unlock (path = this.path) {
    Events.emit('PATHTABS_UNLOCK', path)
  }
}

PathTab.install = install
