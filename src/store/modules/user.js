import { getToken, setToken, removeToken } from '@/utils/cookies'
import { login } from '@/api/user'
import { Toast } from 'vant'
const state = {
  token: getToken(),
  username: '',
  avatar: ''
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_MESSAGES: (state, avatar) => {
    state.avatar = avatar
  }
}
const actions = {
  login({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      login(data).then(res => {
         if (res.code == 200) {
           const { token } = res.data
           commit('SET_TOKEN',  token)
           setToken(token)
         }
         resolve(res)
       }).catch(_ => {
         console.log(_)
         Toast.fail('登录失败~')
        reject()
      })
    }).catch(e => {
      console.log('catch:', e)
    })
  },
  getInfo({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      const data = { username: '小明', avatar: '' }
      commit('SET_AVATAR', data.avatar)
      commit('SET_USERNAME', data.username)
/*
      dispatch('home/test', null, { root: true })
*/
      resolve(data)
    })
  },
  loginOut({ dispatch }) {
    return new Promise((resolve, reject) => {
      dispatch('resetToken')
      resolve()
    })
  },
  resetToken({ commit }, data) {
    return new Promise((resolve, reject) => {
      removeToken()
      commit('SET_TOKEN', '')
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
