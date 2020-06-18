const state = {
  list: ''
}
const mutations = {
  SET_LIST(state, data) {
    state.list = data
  }
}
const actions = {
  test({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      // ajax
      console.log('test')
      state.list = data
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
