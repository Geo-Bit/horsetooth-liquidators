<template>
  <div class="container">
    <div v-if="isLoading" class="loading">
      Loading product details...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="product" class="product-details">
      <!-- Product Information Section -->
      <div class="product-main">
        <div class="product-image">
          <img :src="product.image" :alt="product.title">
        </div>
        
        <div class="product-info">
          <h1>{{ product.title }}</h1>
          <p class="category">{{ product.category }}</p>
          <p class="price">${{ product.price.toFixed(2) }}</p>
          <p class="inventory" :class="{ 'low-stock': product.inventory <= 2 }">
            {{ inventoryStatus }}
          </p>
          <p class="description">{{ product.description }}</p>
          
          <div class="actions">
            <button 
              @click="addToCart"
              class="btn-add-cart"
              :disabled="product.inventory === 0">
              {{ product.inventory === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div v-if="product.reviews" class="reviews-section">
        <h2>Customer Reviews</h2>
        
        <!-- Review Stats -->
        <div class="review-stats">
          <div class="average-rating">
            <span class="rating">{{ averageRating }}</span>
            <div class="stars">
              <span v-for="n in 5" :key="n" class="star">
                ★
              </span>
            </div>
            <span class="review-count">{{ product.reviews.length }} reviews</span>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="reviews-list">
          <div v-for="review in product.reviews" 
               :key="review.id" 
               class="review-card">
            <div class="review-header">
              <div class="stars">
                <span v-for="n in 5" 
                      :key="n"
                      :class="{ active: review.rating >= n }"
                      class="star">★</span>
              </div>
              <span class="review-date">{{ formatDate(review.date) }}</span>
            </div>
            <p class="review-comment" v-html="review.comment"></p>
            <p class="review-author">- {{ review.author }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Product Not Found</h2>
      <p>Sorry, we couldn't find the product you're looking for.</p>
      <router-link to="/products" class="btn-back">
        Back to Products
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'ProductDetails',
  setup() {
    const store = useStore()
    const route = useRoute()
    const isLoading = ref(true)
    const product = ref(null)
    const error = ref(null)

    const inventoryStatus = computed(() => {
      if (!product.value) return ''
      if (product.value.inventory === 0) return 'Out of Stock'
      if (product.value.inventory <= 2) return 'Low Stock!'
      return `${product.value.inventory} in stock`
    })

    const averageRating = computed(() => {
      if (!product.value?.reviews?.length) return 'No ratings yet'
      const avg = product.value.reviews.reduce((acc, review) => acc + review.rating, 0) / product.value.reviews.length
      return avg.toFixed(1)
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const addToCart = () => {
      if (product.value && product.value.inventory > 0) {
        store.dispatch('cart/addToCart', product.value)
      }
    }

    onMounted(async () => {
      try {
        const productId = parseInt(route.params.id)
        await store.dispatch('products/fetchProducts')
        const products = store.getters['products/getProducts']
        const foundProduct = products.find(p => p.id === productId)
        
        if (foundProduct) {
          product.value = foundProduct
        } else {
          error.value = 'Product not found'
        }
      } catch (err) {
        console.error('Error loading product:', err)
        error.value = 'Error loading product details'
      } finally {
        isLoading.value = false
      }
    })

    return {
      product,
      isLoading,
      error,
      inventoryStatus,
      averageRating,
      formatDate,
      addToCart
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 100px;
}

.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.product-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info h1 {
  color: var(--primary-red);
  margin-bottom: 10px;
}

.category {
  color: var(--rock-gray);
  font-size: 0.9em;
  margin-bottom: 15px;
}

.price {
  font-size: 1.5em;
  color: var(--secondary-blue);
  font-weight: bold;
  margin: 15px 0;
}

.inventory {
  color: var(--accent-green);
  margin: 10px 0;
}

.inventory.low-stock {
  color: var(--primary-red);
}

.description {
  line-height: 1.6;
  margin: 20px 0;
}

.actions {
  margin-top: 30px;
}

.btn-add-cart {
  padding: 12px 24px;
  background-color: var(--secondary-blue);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.2s;
}

.btn-add-cart:hover {
  background-color: var(--accent-green);
}

.btn-add-cart:disabled {
  background-color: var(--rock-gray);
  cursor: not-allowed;
}

/* Reviews Section */
.reviews-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eee;
}

.review-stats {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.average-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rating {
  font-size: 2em;
  font-weight: bold;
  color: var(--secondary-blue);
}

.stars {
  color: #ffd700;
}

.star {
  cursor: pointer;
}

.star.active {
  color: #ffd700;
}

.review-count {
  color: var(--rock-gray);
}

.btn-add-review {
  padding: 10px 20px;
  background-color: var(--accent-green);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;
}

.review-form {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.form-group {
  margin: 15px 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.rating-input {
  font-size: 1.5em;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-submit {
  background-color: var(--accent-green);
  color: white;
}

.btn-cancel {
  background-color: var(--rock-gray);
  color: white;
}

.reviews-list {
  margin-top: 30px;
}

.review-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 15px 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.review-date {
  color: var(--rock-gray);
  font-size: 0.9em;
}

.review-comment {
  line-height: 1.6;
  margin: 10px 0;
}

.review-author {
  color: var(--secondary-blue);
  font-style: italic;
}

.not-found {
  text-align: center;
  padding: 40px;
}

.btn-back {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--secondary-blue);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
}

.flag-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.flag-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  margin: 20px;
}

.flag {
  font-family: monospace;
  font-size: 1.2em;
  color: var(--primary-red);
  margin: 20px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.btn-close {
  padding: 8px 16px;
  background: var(--secondary-blue);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .product-main {
    grid-template-columns: 1fr;
  }
  .container {
    padding-top: 80px;
  }
}
</style>
