import { createStore } from 'vuex'

// Auth module
const auth = {
  namespaced: true,
  
  state: {
    user: null,
    isLoggedIn: false
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isLoggedIn = !!user
    }
  },

  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        // Predefined users (in a real app, this would be in a database)
        const users = [
          {
            email: 'admin@example.com',
            password: 'admin123',
            name: 'Admin User'
          },
          {
            email: 'demo@example.com',
            password: 'demo123',
            name: 'Demo User'
          }
        ]

        // Simulate API call
        setTimeout(() => {
          const user = users.find(u => 
            u.email === credentials.email && 
            u.password === credentials.password
          )
          
          if (user) {
            // Remove password before storing user
            const { password, ...userWithoutPassword } = user
            commit('SET_USER', userWithoutPassword)
            resolve(userWithoutPassword)
          } else {
            reject(new Error('Invalid credentials'))
          }
        }, 300) // Simulate network delay
      })
    },

    logout({ commit }) {
      commit('SET_USER', null)
    }
  }
}

// Cart module
const cart = {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    cartItems: state => state.items,
    cartTotal: state => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    itemCount: state => state.items.reduce((count, item) => count + item.quantity, 0)
  },
  mutations: {
    addToCart(state, product) {
      const existingItem = state.items.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({
          ...product,
          quantity: 1
        })
      }
    },
    clearCart(state) {
      state.items = []
    },
    removeFromCart(state, productId) {
      const index = state.items.findIndex(item => item.id === productId)
      if (index > -1) {
        state.items.splice(index, 1)
      }
    },
    updateQuantity(state, { productId, quantity }) {
      const item = state.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
      }
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId)
    },
    updateQuantity({ commit }, payload) {
      commit('updateQuantity', payload)
    }
  }
}

// Create store
export default createStore({
  modules: {
    auth,
    cart
  }
})