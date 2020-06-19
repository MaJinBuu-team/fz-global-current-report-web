import Vue from 'vue'
import Router from 'vue-router'
import reportRoutes from './modules/reports/router'
import userRoutes from './modules/user/router'
import appRoutes from './modules/layout/router'

Vue.use(Router)

function getAbsolutePath () {
  let path = location.pathname
  return path.substring(0, path.lastIndexOf('/') + 1)
 }

export const constantRoutes = [
  ...userRoutes,
  ...appRoutes,
  ...reportRoutes,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  base: getAbsolutePath(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
