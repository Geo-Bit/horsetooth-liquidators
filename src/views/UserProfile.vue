<template>
  <div class="profile-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        Loading profile...
      </div>

      <!-- Error State -->
      <div v-else-if="!user" class="error-state">
        <p>Please log in to view your profile</p>
        <router-link to="/" class="btn-back">Back to Home</router-link>
      </div>

      <!-- Profile Content -->
      <template v-else>
        <div class="profile-header">
          <h1>User Profile</h1>
          <div v-if="isAdmin" class="admin-badge">Admin User</div>
        </div>

        <div class="profile-grid">
          <!-- User Info Card -->
          <div class="profile-card user-info">
            <h2>Account Information</h2>
            <div class="info-group">
              <label>Username:</label>
              <p>{{ user.username }}</p>
            </div>
            <div class="info-group">
              <label>Role:</label>
              <p>{{ user.role }}</p>
            </div>
            <div class="info-group">
              <label>Member Since:</label>
              <p>{{ formatDate(user.created_at) }}</p>
            </div>
            <div class="inbox-section">
              <router-link to="/inbox" class="inbox-link">
                View Inbox
                <span v-if="unreadMessages" class="message-badge">
                  {{ unreadMessages }}
                </span>
              </router-link>
            </div>
          </div>

          <!-- Admin Section (only visible to admin users) -->
          <div v-if="isAdmin" class="profile-card admin-section">
            <h2>Admin Controls</h2>
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
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { MESSAGES_DATA } from '@/data/messages.js'  // Update this import path

export default {
  name: 'UserProfile',
  
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)

    const user = computed(() => store.getters['auth/user'])
    const isAdmin = computed(() => user.value?.role === 'admin')

    // Add computed property for unread messages
    const unreadMessages = computed(() => {
      if (!user.value) return 0
      const userMessages = MESSAGES_DATA[user.value.username]?.inbox || []
      return userMessages.length
    })

    onMounted(async () => {
      // Check authentication status
      if (!store.getters['auth/isAuthenticated']) {
        router.push('/login')
        return
      }
      loading.value = false
    })

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString()
    }

    return {
      user,
      isAdmin,
      loading,
      formatDate,
      unreadMessages
    }
  }
}
</script>

<style scoped>
.profile-page {
  padding: 40px 0;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.admin-badge {
  background-color: var(--primary-red);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9em;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.profile-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.info-group {
  margin: 15px 0;
}

.info-group label {
  color: var(--rock-gray);
  display: block;
  margin-bottom: 5px;
}

.placeholder-text {
  color: var(--rock-gray);
  font-style: italic;
}

.edit-form {
  margin-top: 15px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-edit, .btn-save, .btn-cancel {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: var(--secondary-blue);
  color: white;
}

.btn-save {
  background-color: var(--accent-green);
  color: white;
}

.btn-cancel {
  background-color: var(--rock-gray);
  color: white;
}

.admin-section {
  grid-column: 1 / -1;
}

.admin-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.admin-link {
  display: block;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-decoration: none;
  color: var(--secondary-blue);
  text-align: center;
  transition: background-color 0.2s;
}

.admin-link:hover {
  background-color: #e5e5e5;
}

@media (max-width: 768px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}

.loading-state,
.error-state {
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

.inbox-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.inbox-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: var(--secondary-blue);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.inbox-link:hover {
  background-color: var(--accent-green);
}

.message-badge {
  background-color: var(--primary-red);
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: bold;
}
</style> 