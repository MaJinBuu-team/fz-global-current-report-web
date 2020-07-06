import Layout from '@/modules/layout/pages/Layout'

export default [
  {
    path: '/',
    component: Layout,
    name: '报表',
    meta: { title: '报表', icon: 'example' },
    children: [
      {
        path: 'parking',
        name: 'Parking',
        component: () => import('@/modules/reports/pages/Parking'),
        meta: { title: '停车费用报表', icon: 'table' }
      },
      {
        path: 'ticket',
        name: 'Ticket',
        component: () => import('@/modules/reports/pages/Ticket'),
        meta: { title: '售票报表', icon: 'tree' }
      }
    ]
  }
  
] 


