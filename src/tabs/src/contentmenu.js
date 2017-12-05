import Events from '../utils/events'

export default class ContentMenu {
  constructor (option = []) {
    this.currentPath = ''
    this.option = option

    this.init()
  }

  init () {
    let isZh = navigator.language.indexOf('zh') > -1
    this.menu = document.createElement('div')
    this.menu.className = 'path-tab-contentmenu'
    this.ulNode = document.createElement('ul')
    this.closeNode = document.createElement('li')
    this.reloadNode = document.createElement('li')
    this.otherNode = document.createElement('li')

    this.closeNode.innerText = this.option[0] ? this.option[0] : isZh ? '刷新' : 'refresh'
    this.reloadNode.innerText = this.option[1] ? this.option[1] : isZh ? '关闭' : 'close'
    this.otherNode.innerText = this.option[2] ? this.option[2] : isZh ? '关闭其他' : 'close other'

    this.ulNode.appendChild(this.closeNode)
    this.ulNode.appendChild(this.reloadNode)
    this.ulNode.appendChild(this.otherNode)
    this.menu.appendChild(this.ulNode)
    document.body.appendChild(this.menu)

    this.reloadNode.addEventListener('click', this.reload)
    this.closeNode.addEventListener('click', this.close)
    this.otherNode.addEventListener('click', this.closeOther)
  }

  showContentmenu (oEvent, closable, path) {
    if (!path || typeof path !== 'string') { return }
    this.currentPath = path

    let winWidth = window.innerWidth
    let winHeight = window.innerHeight

    let menuWidth = 100
    let menuHeight = 75

    if (!closable) {
      menuHeight = 50
      this.closeNode.style.display = 'none'
    }
    // flex position
    if (oEvent.clientX + menuWidth <= winWidth) {
      this.menu.style.left = oEvent.clientX + 'px'
    } else {
      this.menu.style.left = oEvent.clientX - menuWidth + 'px'
    }

    if (oEvent.clientY + menuHeight <= winHeight) {
      this.menu.style.top = oEvent.clientY + 'px'
    } else {
      this.menu.style.top = oEvent.clientY - menuHeight + 'px'
    }
  }

  reload () {
    if (!this.currentPath) { return }
    Events.emit('PATHTABS_RELOAD', this.currentPath)
  }

  close () {
    console.log(123)
    console.log(this.currentPath)
    if (!this.currentPath) { return }
    Events.emit('PATHTABS_CLOSE', this.currentPath)
  }

  closeOther () {
    if (!this.currentPath) { return }
    Events.emit('PATHTABS_CLOSEOTHER', this.currentPath)
  }

  destroy () {
    this.reloadNode.removeEventListener('click', this.reload)
    this.closeNode.removeEventListener('click', this.close)
    this.otherNode.removeEventListener('click', this.closeOther)
    document.removeChild(this.menu)
  }
}
