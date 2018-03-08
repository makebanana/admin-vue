// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './util/filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './theme/global.scss'
import 'vue-path-tab/vue-path-tab.css'
import fetch from './util/fetch'
import store from './store/index'
import pathTab from './tab/index'

Vue.prototype.$fetch = fetch
Vue.use(ElementUI)
Vue.config.productionTip = false
Object.keys(filters).forEach(filter => {
  Vue.filter(filter, filters[filter])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  filters,
  router,
  store,
  pathTab,
  template: '<App/>',
  components: { App }
})
