import { createStore } from 'vuex'
import auth from './modules/auth'
import cart from './modules/cart'

const store = createStore({
  modules: {
    auth,
    cart
  }
})

export default store 