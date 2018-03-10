import axios from 'axios'
import { Loading, MessageBox, Notification } from 'element-ui'
import store from '../store/index'
const loadingOption = {
  target: '.main-wrap',
  text: '加载中...'
}
export default function fetch (options) {
  let loadingInstance = null
  let beforeCb = options.beforeCb || function loadingBegin () { loadingInstance = Loading.service(loadingOption) }
  let completeCb = options.completeCb || function loadingEnd () { loadingInstance.close() }
  return new Promise((resolve, reject) => {
    let instance = axios.create({
      timeout: options.timeout || 4000,
      headers: {
        Accept: 'application/json',
        'authorization': sessionStorage.getItem('V_accessToken'),
        'Content-Type': options.data instanceof FormData ? 'multipart/form-data' : 'application/json',
        ...options.headers
      }
    })

    /**
    * 拦截器
    */
    instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
      config.method = options.type || 'GET'
      if (config.method === 'GET') {
        config.params = config.data
      }
      beforeCb()
      return config
    }, error => {
      Notification.error({
        title: '提示',
        message: '数据处理失败：' + error.massege
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
        store.commit('userLogout')

        MessageBox.alert({
          title: '提示',
          message: '用户信息过期,点击确认重新登录',
          type: 'error',
          callback: (action) => {
            location.href = '/login'
          }
        })
        return
      }

      !options.noTips && Notification.error({
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
