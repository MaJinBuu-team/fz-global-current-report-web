import Vue from 'vue'
import Router from 'vue-router'
import reportRoutes from './modules/reports/router'
import userRoutes from './modules/user/router'

Vue.use(Router)

export default new Router({
  routes: [
    ...reportRoutes,
    ...userRoutes
  ]
})
