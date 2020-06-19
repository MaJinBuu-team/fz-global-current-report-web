
import { getParkingDetails, getParkingTotal } from '@/modules/api/parking.js'
import { scenicBusinessDetail } from '../../api/scenicBusiness';
// const state = {
//   count: 0,
//   text: ""
// }

const actions = {
    getParkingDetails({ commit },paramDic) {
        console.log('getParkingDetails入参：'+JSON.stringify(paramDic));
        return new Promise((resolve, reject) => {
            getParkingDetails(paramDic).then(response => {
                resolve(response)
            }).catch(error => {
                console.log("出错了：" + error);
                reject(error)
            })
        })
    },
    getParkingTotal({ commit },paramDic) {
        console.log('getParkingTotal入参：'+JSON.stringify(paramDic));
        return new Promise((resolve, reject) => {
            getParkingTotal(paramDic).then(response => {
                resolve(response)
            }).catch(error => {
                console.log("出错了：" + error);
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