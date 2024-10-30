<template>
  <nav class="nav-bar">
    <div class="container nav-container">
      <router-link to="/" class="logo">
        Horsetooth Liquidators
      </router-link>
      
      <div class="nav-links">
        <router-link to="/products">Products</router-link>
        <router-link to="/cart" class="cart-link">
          <span class="cart-icon">🛒</span>
          <span v-if="cartItemCount" class="cart-count">{{ cartItemCount }}</span>
        </router-link>
        <div class="auth-section" v-if="!isLoggedIn">
          <button @click="showLoginModal" class="btn-login">Login</button>
        </div>
        <div class="user-info" v-else>
          <span class="welcome-text">Welcome, {{ user.name }}</span>
          <button @click="logout" class="btn-logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <div class="modal" v-if="loginModalOpen" @click.self="closeLoginModal">
    <div class="modal-content">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="loginForm.email" 
            required
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            required
          >
        </div>
        <div class="error-message" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <button type="submit" class="btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const loginModalOpen = ref(false)
    const errorMessage = ref('')
    const loginForm = ref({
      email: '',
      password: ''
    })

    const isLoggedIn = computed(() => store.state.auth.isLoggedIn)
    const user = computed(() => store.state.auth.user)
    const cartItemCount = computed(() => store.getters['cart/itemCount'])

    const showLoginModal = () => {
      loginModalOpen.value = true
      errorMessage.value = ''
    }

    const closeLoginModal = () => {
      loginModalOpen.value = false
      loginForm.value = { email: '', password: '' }
      errorMessage.value = ''
    }

    const handleLogin = async () => {
      try {
        await store.dispatch('auth/login', loginForm.value)
        closeLoginModal()
      } catch (error) {
        errorMessage.value = 'Invalid email or password'
      }
    }

    const logout = () => {
      store.dispatch('auth/logout')
    }

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
      cartItemCount
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
</style> 