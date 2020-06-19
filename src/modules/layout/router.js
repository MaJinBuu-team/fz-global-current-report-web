
import Layout from './pages/Layout'

export default [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Dashboard',
      component: () => import('@/modules/layout/pages/Home'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/404',
    component: () => import('@/modules/layout/pages/404'),
    hidden: true
  }
] 


