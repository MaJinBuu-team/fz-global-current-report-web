const state = {
    count: 20
}

const mutations = {
    increment (state) {
      state.count++
    }
}

export default {
    namespaced: true,
    state,
    mutations
  }