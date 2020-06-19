
import { scenicBusinessDetail, scenicBusinessTotal } from '@/modules/api/scenicBusiness'
import tools from '../../core/tools'
// const state = {
//   count: 0,
//   text: ""
// }

const actions = {  
  scenicBusinessDetail({ commit },paramDic){
    console.log('scenicBusinessDetail入参：'+JSON.stringify(paramDic));
    return new Promise((resolve, reject) => {
      scenicBusinessDetail(paramDic).then(response => {
        resolve(response)
      }).catch(error => {
        console.log("出错了：" + error);
        reject(error)
      })
    })
  },
  scenicBusinessTotal({ commit },paramDic){
    console.log('scenicBusinessTotal入参：'+JSON.stringify(paramDic));
    return new Promise((resolve, reject) => {
      scenicBusinessTotal(paramDic).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  // state,
  actions
}