<template>
  <div class="container">
    <div v-if="error" class="error-message">
      Error: {{ error }}
    </div>

    <h2 class="page-title">Our Inventory</h2>
    
    <!-- Search and Filter Section -->
    <div class="filters">
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search inventory..."
          class="search-input"
        >
      </div>
      <select v-model="selectedCategory" class="category-filter">
        <option value="">All Categories</option>
        <option v-for="category in categories" 
                :key="category" 
                :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- No Results Message -->
    <div v-if="filteredProducts.length === 0" class="no-results">
      <p>No products found. Try adjusting your search or category filter.</p>
    </div>

    <!-- Product Grid (existing code) -->
    <div class="product-grid">
      <div v-for="product in filteredProducts" 
           :key="product.id" 
           class="product-card">
        <img :src="product.image" :alt="product.title" class="product-image" />
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p class="price">${{ product.price.toFixed(2) }}</p>
          <p class="inventory">{{ product.inventory }} in stock</p>
          <p class="description">{{ truncateDescription(product.description) }}</p>
          <div class="card-actions">
            <button @click="addToCart(product)" 
                    class="btn-add-cart"
                    :disabled="product.inventory === 0">
              {{ product.inventory === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
            <router-link :to="`/products/${product.id}`" class="btn-view-details">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'ProductList',
  setup() {
    const store = useStore()
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const error = ref(null)

    onMounted(async () => {
      try {
        console.log('Store state before fetch:', store.state)
        await store.dispatch('products/fetchProducts')
        console.log('Store state after fetch:', store.state)
      } catch (e) {
        console.error('Error in setup:', e)
        error.value = e.message
      }
    })

    const products = computed(() => {
      const prods = store.getters['products/getProducts']
      console.log('Computed products:', prods)
      return prods
    })

    const categories = computed(() => {
      if (!products.value) return []
      return [...new Set(products.value.map(product => product.category))]
    })

    const filteredProducts = computed(() => {
      if (!products.value) return []
      let filtered = products.value

      if (selectedCategory.value) {
        filtered = filtered.filter(product => 
          product.category === selectedCategory.value
        )
      }

      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        )
      }

      return filtered
    })

    const addToCart = (product) => {
      if (product.inventory > 0) {
        store.dispatch('cart/addToCart', product)
      }
    }

    const truncateDescription = (description) => {
      return description.length > 100 
        ? description.substring(0, 100) + '...' 
        : description
    }

    return {
      searchQuery,
      selectedCategory,
      filteredProducts,
      categories,
      addToCart,
      truncateDescription,
      error
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

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
}

.search-bar {
  flex: 0 1 400px;
}

.search-input {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid var(--rock-gray);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--secondary-blue);
  box-shadow: 0 0 0 2px rgba(var(--secondary-blue-rgb), 0.1);
}

.category-filter {
  width: 200px;
  padding: 8px 16px;
  border: 1px solid var(--rock-gray);
  border-radius: 4px;
  background-color: white;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: var(--rock-gray);
  background: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.product-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  color: var(--primary-red);
  font-size: 1.2em;
}

.price {
  font-size: 1.2em;
  color: var(--secondary-blue);
  font-weight: bold;
  margin: 10px 0;
}

.inventory {
  color: var(--rock-gray);
  font-size: 0.9em;
  margin: 5px 0;
}

.description {
  color: var(--rock-gray);
  font-size: 0.9em;
  margin: 10px 0;
  line-height: 1.4;
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-add-cart {
  background-color: var(--secondary-blue);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  transition: background-color 0.2s;
}

.btn-add-cart:hover {
  background-color: var(--accent-green);
}

.btn-add-cart:disabled {
  background-color: var(--rock-gray);
  cursor: not-allowed;
}

.btn-view-details {
  background-color: white;
  color: var(--secondary-blue);
  border: 1px solid var(--secondary-blue);
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  flex: 1;
  transition: all 0.2s;
}

.btn-view-details:hover {
  background-color: var(--secondary-blue);
  color: white;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .search-bar {
    flex: 1;
  }

  .category-filter {
    width: 100%;
  }
}
</style>
