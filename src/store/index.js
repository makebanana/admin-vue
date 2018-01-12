import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import picType from './modules/picType'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    picType
  }
})

export default store
