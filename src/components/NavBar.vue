<template>
  <nav class="nav-bar">
    <div class="container nav-container">
      <router-link to="/" class="logo">
        Horsetooth Liquidators
      </router-link>
      
      <div class="nav-links">
        <router-link to="/products">Products</router-link>
        <router-link to="/about">About Us</router-link>
        <router-link to="/cart" class="cart-link">
          <span class="cart-icon">🛒</span>
          <span v-if="cartItemCount" class="cart-count">{{ cartItemCount }}</span>
        </router-link>
        
        <!-- Auth Section -->
        <template v-if="!isLoggedIn">
          <button @click="showLoginModal" class="btn-login">Login</button>
        </template>
        <template v-else>
          <div class="user-menu">
            <div class="user-dropdown">
              <button class="user-button" @click="toggleDropdown">
                <span class="user-icon">👤</span>
                {{ user.username }}
              </button>
              <div class="dropdown-menu" v-show="dropdownOpen">
                <router-link to="/profile" class="dropdown-item">My Profile</router-link>
                <button @click="logout" class="dropdown-item">Logout</button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <div class="modal" v-if="loginModalOpen" @click.self="closeLoginModal">
    <div class="modal-content">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="loginForm.username" 
            required
            :disabled="isLoading"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            required
            :disabled="isLoading"
          >
        </div>
        <div class="error-message" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <button type="submit" class="btn" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const loginModalOpen = ref(false)
    const dropdownOpen = ref(false)
    const errorMessage = ref('')
    const loginForm = ref({
      username: '',
      password: ''
    })
    const isLoading = ref(false)

    const isLoggedIn = computed(() => store.getters['auth/isAuthenticated'])
    const user = computed(() => store.getters['auth/user'])
    const cartItemCount = computed(() => store.getters['cart/itemCount'])

    const showLoginModal = () => {
      loginModalOpen.value = true
      errorMessage.value = ''
    }

    const closeLoginModal = () => {
      loginModalOpen.value = false
      loginForm.value = { username: '', password: '' }
      errorMessage.value = ''
    }

    const handleLogin = async () => {
      if (isLoading.value) return

      isLoading.value = true
      errorMessage.value = ''

      try {
        const success = await store.dispatch('auth/login', loginForm.value)
        if (success) {
          closeLoginModal()
          router.push('/profile')
        } else {
          errorMessage.value = 'Invalid username or password'
        }
      } catch (error) {
        console.error('Login error:', error)
        errorMessage.value = error.response?.data?.message || 'Login failed. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/')
    }

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    // Close dropdown when clicking outside
    const closeDropdown = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        dropdownOpen.value = false
      }
    }

    // Add event listener for clicking outside
    onMounted(() => {
      document.addEventListener('click', closeDropdown)
    })

    onUnmounted(() => {
      document.removeEventListener('click', closeDropdown)
    })

    return {
      loginModalOpen,
      errorMessage,
      loginForm,
      isLoggedIn,
      user,
      showLoginModal,
      closeLoginModal,
      handleLogin,
      logout,
      cartItemCount,
      dropdownOpen,
      toggleDropdown,
      isLoading
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: var(--primary-red);
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  color: var(--rock-gray);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary-red);
}

.btn-login, .btn-logout {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login {
  background-color: var(--secondary-blue);
  color: white;
}

.btn-logout {
  background-color: var(--rock-gray);
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--rock-gray);
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.welcome-text {
  color: var(--rock-gray);
}

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.cart-icon {
  font-size: 1.5rem;
  margin-right: 5px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--primary-red);
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  min-width: 20px;
  text-align: center;
}

.user-menu {
  position: relative;
  margin-left: 15px;
}

.user-dropdown {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 1px solid var(--rock-gray);
  border-radius: 4px;
  color: var(--rock-gray);
  cursor: pointer;
  transition: all 0.2s;
}

.user-button:hover {
  background-color: #f5f5f5;
  border-color: var(--secondary-blue);
  color: var(--secondary-blue);
}

.user-icon {
  font-size: 1.2em;
}

.dropdown-arrow {
  font-size: 0.8em;
  margin-left: 4px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 150px;
  z-index: 1000;
}

.dropdown-item {
  display: block;
  padding: 10px 15px;
  color: var(--rock-gray);
  text-decoration: none;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 1em;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  color: var(--secondary-blue);
}

.dropdown-item + .dropdown-item {
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .user-menu {
    margin-left: 10px;
  }

  .user-button {
    padding: 6px 12px;
  }

  .user-button span:not(.user-icon) {
    display: none;
  }
}
</style> 