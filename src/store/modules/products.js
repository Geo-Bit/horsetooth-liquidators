import api from '../../utils/axios'  // Use our configured axios instance

const products = {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await api.get('/products')  // Remove /api prefix since it's in baseURL
        commit('SET_PRODUCTS', response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  },
  getters: {
    getProducts: state => {
      return state.products
    }
  }
}

export default products 