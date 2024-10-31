import axios from 'axios'

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  error: null
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  error: state => state.error,
  isAdmin: state => state.user?.role === 'admin'
}

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', credentials)
      const { token, user } = response.data
      
      // Save token to localStorage
      localStorage.setItem('token', token)
      
      // Set axios default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      commit('SET_AUTH_SUCCESS', { token, user })
      return true
    } catch (error) {
      commit('SET_ERROR', error.response?.data?.message || 'Login failed')
      return false
    }
  },

  logout({ commit }) {
    // Remove token from localStorage
    localStorage.removeItem('token')
    
    // Remove axios default header
    delete axios.defaults.headers.common['Authorization']
    
    commit('SET_LOGOUT')
  },

  // Check if user is still authenticated (useful for page refreshes)
  async checkAuth({ commit, state }) {
    if (!state.token) return false

    try {
      // Set axios header with existing token
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
      
      // Test token validity by accessing profile endpoint
      const response = await axios.get('http://localhost:3000/api/users/profile')
      commit('SET_USER', response.data.user)
      return true
    } catch (error) {
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
    state.error = null
  },
  SET_USER(state, user) {
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