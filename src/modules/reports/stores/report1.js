import axios from 'axios'

const state = {
    count: 0,
    text:""
}

const mutations = {
    increment (state) {
      state.count++
    },
    dataInit(state,data){
      state.text=data
    }
}

const actions = {
  dataInit(context){
    axios.get('http://ic.tcps.com.cn:12001/test/test').then(res=>{
      context.commit('dataInit',res.data)
    }).catch(err=>{
      console.log(err)
    })
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }