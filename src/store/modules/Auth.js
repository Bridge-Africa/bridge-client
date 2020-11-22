const state = {
  logged_in: false,
  user: {},
  token: null,
  expires_in: null,
  token_type: '',
  status: '',
  intended: '',
  lang: ''
}

const mutations = {
  'LOGGED_IN': (state, payload) => {
    state.token = payload.access_token
    state.user = payload.user
    state.lang = payload.user.lang
    state.expires_in = payload.expires_in
    state.token_type = payload.token_type
    state.logged_in = true
    state.lang = payload.user.lang || 'en'

    localStorage.setItem('user_id', payload.user.id)
    localStorage.setItem('username', payload.user.name)
    localStorage.setItem('email', payload.user.email)
    localStorage.setItem('token', payload.access_token)
    localStorage.setItem('expires', payload.expires_in)
  },
  'LOGGED_OUT': (state) => {
    return new Promise((resolve) => {
      state.token = ''
      state.user = {}
      state.expires_in = null
      state.token_type = null
      state.logged_in = false
      state.status = ''

      localStorage.removeItem('user_id')
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('expires')
      localStorage.removeItem('token')
      resolve()
    })
  },
  'AUTH_REQUEST': (state) => {
    state.status = 'loading'
  },
  'SET_LOCALE': (state, payload) => {
    state.lang = payload
  },
  'AUTH_SUCCESS': (state, token) => {
    state.status = 'success'
  },
  'AUTH_ERROR': (state) => {
    state.status = 'error'
  },
  'INTENDED_URL': (state, url) => {
    state.intended = url
  }
}

const actions = {
  loggedIn ({commit, state}, payload) {
    commit('LOGGED_IN', payload)
  },
  async logout ({commit}) {
    await commit('LOGGED_OUT')
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  async isLoggedIn ({commit}) {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  },
  setIntended ({commit}, payload) {
    commit('INTENDED_URL', payload)
  },
  changeLocale ({commit}, payload) {
    commit('SET_LOCALE', payload)
  },
  authRequest ({commit}) {
    commit('AUTH_REQUEST')
  },
  authError ({commit}) {
    commit('AUTH_ERROR')
  },
  authSuccess ({commit}) {
    commit('AUTH_SUCCESS')
  }
}

const getters = {
  getToken (state) {
    return localStorage.getItem('token')
  },
  getUsername (state) {
    return localStorage.getItem('username')
  },
  getLocale (state) {
    return state.lang
  },
  loggedIn (state) {
    return localStorage.getItem('token') && localStorage.getItem('token').length
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
