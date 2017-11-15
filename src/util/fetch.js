import axios from 'axios'
import { Loading, MessageBox, Notification } from 'element-ui'
const loadingOption = {
  fullscreen: false,
  text: '加载中...'
}
let loadingInstance = null
export default function fetch (options) {
  let beforeCb = options.beforeCb || function loadingBegin () { loadingInstance = Loading.service(loadingOption) }
  let completeCb = options.completeCb || function loadingEnd () { loadingInstance.close() }
  return new Promise((resolve, reject) => {
    let instance = axios.create({
      timeout: 2000,
      headers: {
        'authorization': localStorage.getItem('bu_authorization'),
        'Content-Type': 'application/json'
      }
    })
    /**
    * 拦截器
    */
    instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
      if (config.method === 'get') {
        config.params = config.data
      }
      beforeCb()
      return config
    }, error => {
      Notification.error({
        title: '提示',
        message: '数据处理失败：' + error
      })
      // 对请求错误做些什么
      completeCb()
    })

    instance(options).then(response => {
      // 关闭过度动画
      completeCb()
      let returnCode = Number(response.data.code)

      // 正常返回
      if (returnCode === 200) {
        return resolve(response.data)
      }

      if (returnCode === 401) {
        // 删除用户token
        localStorage.removeItem('bu_authorization')
        localStorage.removeItem('bu_userId')

        MessageBox.alert({
          title: '提示',
          message: '用户信息过期,点击确认重新登录',
          type: 'error',
          callback: (action) => {
            if (action.confrim) {
              // store设置用户未登录
            }
          }
        })
        return
      }

      Notification.error({
        title: '提示',
        message: response.data.message || '处理失败'
      })
      reject(response.data)
    }).catch(error => {
      completeCb()
      Notification.error({
        title: '提示',
        message: 'axios数据处理失败：' + error
      })
      reject(error)
    })
  })
}
