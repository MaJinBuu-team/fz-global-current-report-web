import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import reportsModule from './modules/reports/store'
import userModule from '../../modules/user/store'
import { getToken } from '@/modules/core/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  baseURL: "http://ic.tcps.com.cn:12980/report/",
  // baseURL: "https://flkj2017.com/report/",
  timeout: 5000 // request timeout

  // http://121.89.195.134:8084
  // http://ic.tcps.com.cn:12980/report/
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (userModule.getters.token) {
    //   // let each request carry token
    //   // ['Authorization'] is a custom headers key
    //   // please modify it according to the actual situation
    // }
    config.headers['Authorization'] = getToken()
    console.log('token=='+config.headers['Authorization']);
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 401: 登录过期或未登录;
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('您的登录信息已过期，请尝试重新登录', '登录过期', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      // console.log(JSON.stringify(res));
      return Promise.reject(JSON.stringify(res))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
