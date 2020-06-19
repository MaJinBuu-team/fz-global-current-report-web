import { login, logout } from '@/modules/api/user'
import { getToken, setToken, removeToken } from '@/modules/core/auth'
import { resetRouter } from '@/router'
import tools from '../../core/tools'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginName: username.trim(), loginPwd: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        localStorage.setItem("parkId",JSON.stringify(response.parkId))
        localStorage.setItem("scenicId",JSON.stringify(response.scenicId))
        console.log("登录返回"+JSON.stringify(data));
        setToken(data.token)
        console.log('存储的token=='+data.token);
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

const getters = {
  token: state => state.token,
  avatar: state => state.avatar,
  name: state => state.name
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

