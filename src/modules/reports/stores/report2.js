
const state = {
    count: 10
}

const mutations = {
    increment (state) {
      state.count--
    }
}

export default {
    namespaced: true,
    state,
    mutations
}