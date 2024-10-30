import productsData from '../../data/products.json'

export default {
  state: {
    products: productsData.products
  },
  getters: {
    getProducts: state => state.products
  }
} 