<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Login</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username"
          v-model="credentials.username"
          required
        >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password"
          v-model="credentials.password"
          required
        >
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(false)
    
    const credentials = ref({
      username: '',
      password: ''
    })

    const handleLogin = async () => {
      loading.value = true
      try {
        const success = await store.dispatch('auth/login', credentials.value)
        if (success) {
          router.push('/dashboard')
        }
      } finally {
        loading.value = false
      }
    }

    return {
      credentials,
      loading,
      handleLogin,
      error: computed(() => store.getters['auth/error'])
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.error-message {
  color: red;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 