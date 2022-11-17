import { getPortalUserInfo } from '@/api/user'
import { getToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  user: getUserInfo()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERDATA: (state, data) => {
    state.user = data
    setUserInfo(data)
  }
}

const actions = {
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getPortalUserInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败,请重新登录.')
        }
        const { userName, avatar } = data

        commit('SET_USERDATA', data)
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      removeUserInfo()
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

