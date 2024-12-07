<template>
  <div class="orders-page">
    <div class="container">
      <h1>Order History</h1>
      
      <div v-if="loading" class="loading">
        Loading orders...
      </div>
      
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-else>
        <div v-if="!orders.length" class="no-orders">
          <p>You haven't placed any orders yet.</p>
          <router-link to="/products" class="btn-shop">Start Shopping</router-link>
        </div>
        
        <div v-else class="orders-list">
          <div v-for="order in orders" :key="order.id" class="order-card">
            <div class="order-header">
              <div class="order-header-left">
                <span class="order-id">Order #{{ order.id }}</span>
                <span class="order-date">{{ formatDate(order.date) }}</span>
              </div>
              <button @click="loadOrderDetails(order.id)" class="btn-details">
                View Details
              </button>
            </div>
            
            <!-- Order details section -->
            <div v-if="orderDetails[order.id]" class="order-details">
              <div class="order-items">
                <div v-for="item in orderDetails[order.id].items" :key="item.productId" class="order-item">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-quantity">x{{ item.quantity }}</span>
                  <span class="item-price">${{ item.price }}</span>
                </div>
              </div>
              <div class="order-footer">
                <span class="order-total">Total: ${{ orderDetails[order.id].total }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'OrderHistory',
  setup() {
    const orders = ref([])
    const orderDetails = ref({})
    const loading = ref(true)
    const error = ref(null)
    const store = useStore()

    const fetchOrders = async () => {
      try {
        const baseURL = process.env.NODE_ENV === 'production'
          ? 'https://horsetooth-backend-885625737131.us-central1.run.app'
          : ''
        
        const token = store.getters['auth/token']
        const response = await axios.get(`${baseURL}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        orders.value = response.data.orders
      } catch (error) {
        console.error('Error fetching orders:', error)
        error.value = 'Failed to load orders. Please try again later.'
      } finally {
        loading.value = false
      }
    }

    const loadOrderDetails = async (orderId) => {
      try {
        const baseURL = process.env.NODE_ENV === 'production'
          ? 'https://horsetooth-backend-885625737131.us-central1.run.app'
          : ''
        
        const token = store.getters['auth/token']
        const response = await axios.get(`${baseURL}/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        orderDetails.value[orderId] = response.data.order
      } catch (err) {
        console.error(`Error fetching order ${orderId}:`, err)
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    onMounted(fetchOrders)

    return {
      orders,
      orderDetails,
      loading,
      error,
      loadOrderDetails,
      formatDate
    }
  }
}
</script>

<style scoped>
.orders-page {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 20px;
}

.error-message {
  color: var(--primary-red);
  text-align: center;
  padding: 20px;
}

.no-orders {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.order-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  padding: 20px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.order-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.order-status.completed {
  background-color: var(--success-green);
  color: white;
}

.order-status.processing {
  background-color: var(--warning-yellow);
  color: black;
}

.order-items {
  margin: 15px 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.order-footer {
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  text-align: right;
}

.order-total {
  font-weight: bold;
  font-size: 1.1em;
}

.debug-comment {
  color: #999;
  font-size: 0.8em;
  margin-bottom: 20px;
}

.btn-shop {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--secondary-blue);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.btn-shop:hover {
  background-color: var(--primary-red);
}

.order-header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.order-date {
  color: var(--rock-gray);
  font-size: 0.9em;
}

.btn-details {
  padding: 8px 16px;
  background-color: var(--secondary-blue);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-details:hover {
  background-color: var(--primary-red);
}
</style> 