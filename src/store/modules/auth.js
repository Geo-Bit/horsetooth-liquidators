import axios from 'axios'

// Set default axios config
axios.defaults.withCredentials = true

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: false
}

const getters = {
  isAuthenticated: state => !!state.token && !!state.user,
  user: state => state.user,
  isSuperAdmin: state => state.user?.role === 'super_admin',
  isAdmin: state => ['admin', 'super_admin'].includes(state.user?.role),
  token: state => state.token
}

const actions = {
  async login({ commit }, credentials) {
    try {
      console.log('Attempting login with:', credentials.username);
      const response = await axios.post('http://localhost:3000/api/auth/login', credentials, {
        withCredentials: true
      })
      const { token, user } = response.data
      
      console.log('Login successful:', user);
      
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      commit('SET_AUTH_SUCCESS', { token, user })
      return true
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
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

  // Modify checkAuth to be more permissive
  async checkAuth({ commit, state }) {
    const token = state.token || localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (!token || !storedUser) {
      commit('SET_LOGOUT')
      return false
    }

    try {
      // Don't verify with backend, just decode the token
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const decodedToken = JSON.parse(window.atob(base64))
      
      // Set auth state based on token contents
      commit('SET_AUTH_SUCCESS', { 
        token, 
        user: decodedToken 
      })
      
      // Update axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
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
    // Also update localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  },
  SET_LOGOUT(state) {
    state.token = null
    state.user = null
    state.isAuthenticated = false
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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