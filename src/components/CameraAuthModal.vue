<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h3>Camera Authentication Required</h3>
      <p>Enter credentials for {{ cameraLocation }}</p>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            v-model="credentials.username" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            v-model="credentials.password" 
            required
          />
        </div>

        <div class="error-message" v-if="error">
          {{ error }}
        </div>
        
        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn-cancel">
            Cancel
          </button>
          <button type="submit" class="btn-submit">
            View Feed
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CameraAuthModal',
  
  props: {
    show: Boolean,
    cameraId: String,
    cameraLocation: String
  },

  emits: ['close', 'authenticate'],

  setup(props, { emit }) {
    const credentials = ref({
      username: '',
      password: ''
    })
    const error = ref('')

    const handleSubmit = async () => {
      try {
        emit('authenticate', {
          cameraId: props.cameraId,
          ...credentials.value
        })
        // Reset form after submission
        credentials.value = { username: '', password: '' }
        error.value = ''
      } catch (err) {
        error.value = 'Authentication failed'
      }
    }

    return {
      credentials,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-submit {
  padding: 0.5rem 1rem;
  background: var(--accent-green);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
  color: var(--primary-red);
  margin-top: 1rem;
  font-size: 0.9em;
}
</style> 