import { login, logout, getInfo, refreshToken } from '@/api/user'
import { getToken, getRefreshToken, setToken, setRefreshToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  refreshToken: getRefreshToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DEPART: (state, depart) => {
    state.depart = depart
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { resultBody } = response
        commit('SET_TOKEN', resultBody.token)
        commit('SET_REFRESH_TOKEN', resultBody.refreshToken)
        setToken(resultBody.token)
        setRefreshToken(resultBody.refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        let { resultBody } = response

        if (!resultBody) {
          // refreshToken
          refreshToken(state.refreshToken).then(response => {
            resultBody = response.resultBody
          }).catch(error => {
            reject(error)
          })
          if (!resultBody) {
            reject('用户验证失败，请重新登录')
          }
        }

        const { name, depart, roles } = resultBody
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('用户未授权使用本系统，请联系管理员')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_DEPART', depart)
        commit('SET_ROLES', roles)
        resolve(resultBody)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_DEPART', '')
        commit('SET_AVATAR', '')
        commit('SET_ROLES', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
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

