import { createStore } from 'vuex'
import auth from './modules/auth'
import cart from './modules/cart'
import products from './modules/products'

console.log('Creating store with modules:', { auth, cart, products }) // Debug log

const store = createStore({
  modules: {
    auth,
    cart,
    products
  }
})

// Debug: Log store state after creation
console.log('Store created:', store.state)

export default store