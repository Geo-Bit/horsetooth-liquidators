<template>
  <div class="container">
    <h2 class="page-title">Shopping Cart</h2>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/products" class="btn-continue">Continue Shopping</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" 
             :key="item.id" 
             class="cart-item">
          <img :src="item.image" :alt="item.title" class="item-image">
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="item-price">${{ item.price.toFixed(2) }}</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item.id, item.quantity - 1)"
                      :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)"
                      :disabled="item.quantity >= item.inventory">+</button>
            </div>
          </div>
          <button @click="removeFromCart(item.id)" class="btn-remove">Remove</button>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8%):</span>
          <span>${{ (cartTotal * 0.08).toFixed(2) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ (cartTotal * 1.08).toFixed(2) }}</span>
        </div>
        <router-link to="/checkout" class="btn-checkout">
          Proceed to Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Cart',
  setup() {
    const store = useStore()
    const router = useRouter()

    const cartItems = computed(() => store.getters['cart/cartItems'])
    const cartTotal = computed(() => store.getters['cart/cartTotal'])

    const updateQuantity = (productId, quantity) => {
      if (quantity > 0) {
        store.dispatch('cart/updateQuantity', { productId, quantity })
      }
    }

    const removeFromCart = (productId) => {
      store.dispatch('cart/removeFromCart', productId)
    }

    return {
      cartItems,
      cartTotal,
      updateQuantity,
      removeFromCart
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  color: var(--primary-red);
  text-align: center;
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
  padding: 0 20px;
}

.item-price {
  color: var(--secondary-blue);
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-controls button {
  padding: 5px 10px;
  border: 1px solid var(--rock-gray);
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-remove {
  padding: 8px 16px;
  background-color: var(--primary-red);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cart-summary {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  position: sticky;
  top: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.total {
  font-weight: bold;
  font-size: 1.2em;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
}

.btn-checkout {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: var(--accent-green);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
}

.btn-continue {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--secondary-blue);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style> 