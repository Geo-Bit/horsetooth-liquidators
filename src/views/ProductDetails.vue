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
            <p class="review-comment">{{ review.comment }}</p>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import productsData from '../data/products.json'

export default {
  name: 'ProductDetails',
  setup() {
    const route = useRoute()
    const store = useStore()
    const showReviewForm = ref(false)
    
    // Get product data
    const product = computed(() => {
      return productsData.products.find(p => p.id === parseInt(route.params.id))
    })

    // Get reviews from product data
    const reviews = computed(() => {
      return product.value?.reviews || []
    })

    const newReview = ref({
      rating: 0,
      comment: '',
      author: 'Anonymous'
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

    const submitReview = () => {
      if (newReview.value.rating === 0) {
        alert('Please select a rating')
        return
      }

      // In a real app, this would be an API call
      // For now, we'll just update the local state
      reviews.value.unshift({
        id: reviews.value.length + 1,
        ...newReview.value,
        date: new Date().toISOString().split('T')[0]
      })

      newReview.value = {
        rating: 0,
        comment: '',
        author: 'Anonymous'
      }
      showReviewForm.value = false
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    return {
      product,
      reviews,
      showReviewForm,
      newReview,
      averageRating,
      inventoryStatus,
      addToCart,
      submitReview,
      formatDate
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

@media (max-width: 768px) {
  .product-main {
    grid-template-columns: 1fr;
  }
}
</style>
