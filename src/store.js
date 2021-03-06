import Vuex from 'vuex'
import Vue from 'vue'
import reportsModule from './modules/reports/store'
import userModule from './modules/user/store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      ...reportsModule,
      ...userModule
    }
  })