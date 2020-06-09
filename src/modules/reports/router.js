
import Report2 from './pages/Report2';
import RootContainer from './pages/RootContainer'
import Report1Detail from './pages/Report1Detail'
import Report2Detail from './pages/Report2Detail'
export default [
  {
    path: "/",
    name: "report.rootContainer",
    component: RootContainer,
    props: false,
    children: [
      {
        path: "/report1Detail",
        name: "report1Detail",
        component: Report1Detail,
        props: false
      },
      {
        path: "/report2",
        name: "report2",
        component: Report2,
        props: false
      },
      {
        path: "/report2Detail",
        name: "report2Detail",
        component: Report2Detail,
        props: false
      }
    ]
  },
  
] 


