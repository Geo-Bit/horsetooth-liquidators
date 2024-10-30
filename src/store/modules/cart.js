export default {
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
    },
    clearCart(state) {
      state.items = []
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
    },
    clearCart({ commit }) {
      commit('clearCart')
    }
  }
} 