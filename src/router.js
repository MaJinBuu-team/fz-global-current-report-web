import Vue from 'vue'
import Router from 'vue-router'
import reportRoutes from './modules/reports/router'
import userRoutes from './modules/user/router'

Vue.use(Router)

function getAbsolutePath () {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
 }

export default new Router({
  mode: 'history',
  base: getAbsolutePath(),
  routes: [
    ...reportRoutes,
    ...userRoutes
  ]
})
