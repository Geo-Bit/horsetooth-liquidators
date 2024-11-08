import axios from 'axios'

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
        const response = await axios.get('/api/products')
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