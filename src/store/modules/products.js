import api from '../../utils/axios'  // Use our configured axios instance

const products = {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      console.log('Setting products:', products)
      state.products = products
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      console.log('Fetching products...')
      try {
        const response = await api.get('/products')  // Remove /api prefix since it's in baseURL
        console.log('API response:', response.data)
        commit('SET_PRODUCTS', response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
  },
  getters: {
    getProducts: state => {
      console.log('Getting products:', state.products)
      return state.products
    }
  }
}

export default products 