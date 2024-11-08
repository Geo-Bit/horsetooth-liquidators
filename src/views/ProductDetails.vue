<template>
  <div class="container">
    <div v-if="product" class="product-details">
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
              @click="addToCart(product)"
              class="btn-add-cart"
              :disabled="product.inventory === 0">
              {{ product.inventory === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="reviews-section">
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
            <span class="review-count">{{ reviews.length }} reviews</span>
          </div>
        </div>

        <!-- Add Review Button -->
        <button @click="showReviewForm = true" class="btn-add-review">
          Write a Review
        </button>

        <!-- Review Form -->
        <div v-if="showReviewForm" class="review-form">
          <h3>Write Your Review</h3>
          <form @submit.prevent="submitReview">
            <div class="form-group">
              <label>Rating</label>
              <div class="rating-input">
                <span v-for="n in 5" 
                      :key="n"
                      @click="newReview.rating = n"
                      :class="{ active: newReview.rating >= n }"
                      class="star">★</span>
              </div>
            </div>
            <div class="form-group">
              <label>Review</label>
              <textarea 
                v-model="newReview.comment"
                required
                rows="4"
                placeholder="Share your thoughts about this product..."></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-submit">Submit Review</button>
              <button type="button" 
                      @click="showReviewForm = false" 
                      class="btn-cancel">Cancel</button>
            </div>
          </form>
        </div>

        <!-- Reviews List -->
        <div class="reviews-list">
          <div v-for="review in reviews" 
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

  <div v-if="showFlag" class="flag-modal">
    <div class="flag-content">
      <h2>🎉 Congratulations!</h2>
      <p>You successfully exploited the stored XSS vulnerability to steal the admin cookie!</p>
      <p class="flag">Flag: {{ flag }}</p>
      <button @click="showFlag = false" class="btn-close">Close</button>
    </div>
  </div>

  <div v-if="showFlagModal" class="flag-modal">
    <div class="flag-content">
      <h2>🎉 Inventory Exploit Successful!</h2>
      <p>You've discovered a vulnerability in our inventory system!</p>
      <p class="flag">Flag: {{ flagMessage }}</p>
      <button @click="showFlagModal = false" class="btn-close">Close</button>
    </div>
  </div>

  <div class="inventory-debug" style="display: none;">
    <!-- Hidden debug feature that allows inventory updates -->
    <input type="number" 
           :value="product.inventory"
           @change="e => updateInventory(e.target.value)"
           class="debug-input">
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'ProductDetails',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const user = computed(() => store.getters['auth/user'])
    
    // Get product data from store instead of direct import
    const product = computed(() => {
      const productId = parseInt(route.params.id)
      return store.getters.getProducts.find(p => p.id === productId)
    })

    // Use localStorage to store reviews per user
    const getStorageKey = () => `reviews_${user.value?.username}_${route.params.id}`
    
    const reviews = ref([])
    const newReview = ref({
      rating: 0,
      comment: '',
      author: 'Anonymous'
    })

    const showReviewForm = ref(false)

    const showFlag = ref(false)
    const flag = ref('')

    const showFlagModal = ref(false)
    const flagMessage = ref('')

    onMounted(async () => {
      // Fetch products if not already loaded
      if (store.getters.getProducts.length === 0) {
        await store.dispatch('fetchProducts')
      }

      // Load reviews from localStorage for this user and product
      const storedReviews = localStorage.getItem(getStorageKey())
      // Combine stored reviews with product's default reviews
      reviews.value = [
        ...(storedReviews ? JSON.parse(storedReviews) : []),
        ...(product.value?.reviews || [])
      ]
    })

    const averageRating = computed(() => {
      if (reviews.value.length === 0) return 0
      const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
      return (sum / reviews.value.length).toFixed(1)
    })

    const inventoryStatus = computed(() => {
      if (product.value.inventory === 0) return 'Out of Stock'
      if (product.value.inventory <= 2) return `Only ${product.value.inventory} left!`
      return `${product.value.inventory} in stock`
    })

    const addToCart = (product) => {
      if (product.inventory > 0) {
        store.dispatch('cart/addToCart', product)
      }
    }

    // Create a secret admin cookie that's not easily visible
    document.cookie = "admin_secret=super_sensitive_data;path=/;samesite=lax"

    // Setup event listener for successful data exfiltration
    window.addEventListener('message', (event) => {
      // Check if the stolen cookie was successfully exfiltrated
      if (event.data && event.data.includes('admin_secret=super_sensitive_data')) {
        flag.value = 'noco{3b1b11d6f84e53d3c99327b324f506d9}'
        showFlag.value = true
      }
    })

    const submitReview = () => {
      if (newReview.value.rating === 0) {
        alert('Please select a rating')
        return
      }

      // Intentionally don't sanitize input to allow XSS
      reviews.value.unshift({
        id: reviews.value.length + 1,
        ...newReview.value,
        date: new Date().toISOString().split('T')[0]
      })

      newReview.value = {
        rating: 0,
        comment: '',
        author: user.value?.username || 'Anonymous'
      }
      showReviewForm.value = false
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const updateInventory = async (newInventory) => {
      try {
        const response = await axios.put(`/api/products/update-inventory/${product.value.id}`, {
          inventory: newInventory
        })
        
        // Check if we got a flag
        if (response.data.flag) {
          flagMessage.value = response.data.flag
          showFlagModal.value = true
        }
        
        // Update local product data
        product.value.inventory = newInventory
      } catch (error) {
        console.error('Error updating inventory:', error)
      }
    }

    return {
      product,
      reviews,
      newReview,
      showReviewForm,
      averageRating,
      inventoryStatus,
      addToCart,
      submitReview,
      formatDate,
      showFlag,
      flag,
      updateInventory,
      showFlagModal,
      flagMessage
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
}
</style>
