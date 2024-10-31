import axios from 'axios'

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  token: state => state.token
}

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', credentials)
      const { token, user } = response.data
      
      // Save token to localStorage
      localStorage.setItem('token', token)
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      commit('SET_AUTH_SUCCESS', { token, user })
      return true
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Login failed')
      return false
    }
  },

  async logout({ commit, dispatch }) {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    commit('SET_LOGOUT')
    // Reset chat history
    if (window.__chatBot) {
      window.__chatBot.resetChat()
    }
  },

  // Add this new action to check auth state
  async checkAuth({ commit, state }) {
    const token = state.token || localStorage.getItem('token')
    
    if (!token) {
      commit('SET_LOGOUT')
      return false
    }

    try {
      // Set the token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      // Verify token by fetching user profile
      const response = await axios.get('http://localhost:3000/api/users/profile')
      commit('SET_AUTH_SUCCESS', { token, user: response.data.user })
      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      commit('SET_LOGOUT')
      return false
    }
  }
}

const mutations = {
  SET_AUTH_SUCCESS(state, { token, user }) {
    state.token = token
    state.user = user
    state.isAuthenticated = true
  },
  SET_LOGOUT(state) {
    state.token = null
    state.user = null
    state.isAuthenticated = false
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
} 