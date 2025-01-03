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
        console.log('API URL:', import.meta.env.VITE_API_URL);
        console.log('API instance baseURL:', api.defaults.baseURL);
        
        const BASE_URL = process.env.NODE_ENV === 'production'
          ? 'https://horsetooth-backend-885625737131.us-central1.run.app'
          : 'http://localhost:3000';
        
        const response = await api.get(`${BASE_URL}/api/products`)  // Changed back to /api/products
        console.log('API Response:', response);
        commit('SET_PRODUCTS', response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
        console.error('Error config:', error.config)  // This will show the full request config
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