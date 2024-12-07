<template>
  <camera-auth-modal
    :show="showAuthModal"
    :camera-id="selectedCamera?.id"
    :camera-location="selectedCamera?.location"
    @close="closeAuthModal"
    @authenticate="handleCameraAuth"
  />

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
          <div v-if="isSuperAdmin" class="super-admin-badge">Super Admin</div>
          <div v-else-if="isAdmin" class="admin-badge">Admin User</div>
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

          <!-- Super Admin Dashboard -->
          <div v-if="isSuperAdmin" class="profile-card super-admin-section">
            <SuperAdminDashboard />
          </div>

          <!-- Regular Admin Section -->
          <div v-else-if="isAdmin" class="profile-card admin-section">
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
              <router-link to="/admin/api-docs" class="admin-link api-docs-link">
                API Documentation
                <span class="debug-badge">DEBUG</span>
              </router-link>
            </div>

          </div>
        </div>
      </template>
    </div>
  </div>

  <div v-if="showCameraModal" class="camera-modal">
    <div class="camera-modal-content">
      <button class="close-button" @click="closeCameraModal">×</button>
      <h3>Camera Feed</h3>
      <div class="camera-feed">
        <img 
          v-if="cameraUrl" 
          :src="cameraUrl" 
          alt="Camera Feed"
          @error="handleImageError"
          crossorigin="use-credentials"
        />
        <div v-if="cameraError" class="error-message">
          {{ cameraError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { MESSAGES_DATA } from '@/data/messages.js'
import api from '@/utils/axios'
import CameraAuthModal from '@/components/CameraAuthModal.vue'
import SuperAdminDashboard from '@/components/SuperAdminDashboard.vue'

export default {
  name: 'UserProfile',
  components: {
    CameraAuthModal,
    SuperAdminDashboard
  },
  
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

    const user = computed(() => store.getters['auth/user'])
    const isAdmin = computed(() => user.value?.role === 'admin')
    const isSuperAdmin = computed(() => user.value?.role === 'super_admin')

    // Add computed property for unread messages
    const unreadMessages = computed(() => {
      if (!user.value) return 0
      const userMessages = MESSAGES_DATA[user.value.username]?.inbox || []
      return userMessages.length
    })

    const showCameraModal = ref(false)
    const cameraUrl = ref(null)
    const cameraError = ref(null)

    const openCameraFeed = async (cameraId) => {
      const token = store.getters['auth/token']
      if (!token) {
        cameraError.value = 'Authentication required'
        return
      }

      try {
        // Create a URL with the JWT token
        const url = new URL(`${backendUrl}/api/security/camera/${cameraId}/stream`)
        url.searchParams.append('token', token)
        
        // Show the modal with basic auth prompt
        showCameraModal.value = true
        cameraUrl.value = url.toString()
        cameraError.value = null

        // The browser will automatically handle the basic auth prompt
        // when the image tries to load
      } catch (error) {
        console.error('Error accessing camera feed:', error)
        cameraError.value = 'Error accessing camera feed'
        showCameraModal.value = true
      }
    }

    const handleImageError = () => {
      cameraError.value = 'Failed to load camera feed'
    }

    const closeCameraModal = () => {
      showCameraModal.value = false
      cameraUrl.value = null
      cameraError.value = null
    }

    onMounted(async () => {
      if (!store.getters['auth/isAuthenticated']) {
        router.push('/login')
        return
      }
      loading.value = false
    })

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const showAuthModal = ref(false)
    const selectedCamera = ref(null)
    const authorizedCameras = ref({})

    const openAuthModal = (camera) => {
      selectedCamera.value = camera
      showAuthModal.value = true
    }

    const closeAuthModal = () => {
      showAuthModal.value = false
      selectedCamera.value = null
    }

    const handleCameraAuth = async (credentials) => {
      try {
        const response = await api.post(`/api/security/camera/${credentials.cameraId}/auth`, {
          username: credentials.username,
          password: credentials.password
        })
        
        if (response.data.success) {
          authorizedCameras.value[credentials.cameraId] = true
          closeAuthModal()
        }
      } catch (error) {
        console.error('Camera auth failed:', error)
        if (error.response?.status === 401) {
          // Show error in modal instead of redirecting
          return false
        }
      }
    }

    return {
      loading,
      user,
      isAdmin,
      isSuperAdmin,
      unreadMessages,
      formatDate,
      openCameraFeed,
      backendUrl,
      showAuthModal,
      selectedCamera,
      authorizedCameras,
      openAuthModal,
      closeAuthModal,
      handleCameraAuth,
      showCameraModal,
      cameraUrl,
      cameraError,
      handleImageError,
      closeCameraModal
    }
  }
}
</script>

<style scoped>
.profile-page {
  padding: 20px;
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
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.profile-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-group {
  margin-bottom: 15px;
}

.info-group label {
  display: block;
  color: var(--rock-gray);
  margin-bottom: 5px;
}

.info-group p {
  margin: 0;
  font-size: 1.1em;
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

.security-feeds {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.camera-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.camera-link {
  padding: 10px 15px;
  background-color: var(--secondary-blue);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background-color 0.2s;
}

.camera-link:hover {
  background-color: var(--accent-green);
}

.camera-item {
  margin-bottom: 1.5rem;
}

.camera-details {
  margin-top: 0.5rem;
  font-size: 0.9em;
  color: var(--rock-gray);
}

.camera-note {
  display: block;
  font-size: 0.85em;
  font-style: italic;
  margin-top: 0.25rem;
}

.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.camera-modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.camera-feed {
  margin-top: 20px;
}

.camera-feed img {
  max-width: 100%;
  height: auto;
}

.error-message {
  color: red;
  padding: 20px;
  text-align: center;
}

.debug-badge {
  background: #ffc107;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.super-admin-badge {
  background-color: #dc3545;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9em;
}
</style> 