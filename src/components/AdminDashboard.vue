<template>
  <div class="admin-dashboard">
    <h2>Admin Controls</h2>
    
    <!-- JWT Challenge Success Message -->
    <div v-if="dashboardData?.jwtFlag" class="success-message">
      <p>🚩 JWT Challenge Complete!</p>
      <code>{{ dashboardData.jwtFlag }}</code>
    </div>

    <!-- Admin Users Section -->
    <div v-if="dashboardData?.adminUsers" class="admin-users">
      <h3>System Administrators</h3>
      <div v-for="admin in dashboardData.adminUsers" :key="admin.username" class="admin-card">
        <p><strong>Username:</strong> {{ admin.username }}</p>
        <p><strong>Role:</strong> {{ admin.role }}</p>
        <p><strong>Last Login:</strong> {{ admin.lastLogin }}</p>
        <p class="hash-data"><strong>Password Hash:</strong> {{ admin.passwordHash }}</p>
        <p><strong>Notes:</strong> {{ admin.notes }}</p>
      </div>
    </div>

    <!-- Regular Admin Links -->
    <div class="admin-links">
      <router-link to="/admin/products" class="admin-link">
        Manage Products
      </router-link>
      <router-link to="/admin/users" class="admin-link">
        Manage Users
      </router-link>
      <router-link to="/admin/orders" class="admin-link">
        View Orders
      </router-link>
      <router-link to="/admin/api-docs" class="admin-link api-docs-link">
        API Documentation
        <span class="debug-badge">DEBUG</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  setup() {
    const store = useStore()
    const dashboardData = ref(null)

    const fetchDashboardData = async () => {
      try {
        const baseURL = process.env.NODE_ENV === 'production'
          ? 'https://horsetooth-backend-885625737131.us-central1.run.app'
          : 'http://localhost:3000'
        
        const token = store.getters['auth/token']
        const response = await axios.get(`${baseURL}/api/admin/dashboard-data`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        dashboardData.value = response.data
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    onMounted(fetchDashboardData)

    return {
      dashboardData
    }
  }
}
</script>

<style scoped>
.success-message {
  background: #d4edda;
  border: 2px dashed #28a745;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
}

.success-message code {
  display: block;
  margin-top: 10px;
  font-family: monospace;
  font-size: 1.2em;
  color: #28a745;
}

.admin-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
}

.hash-data {
  font-family: monospace;
  background: #eee;
  padding: 10px;
  border-radius: 4px;
  overflow-wrap: break-word;
}
</style> 