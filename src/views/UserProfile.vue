<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <h1>User Profile</h1>
        <div v-if="isAdmin" class="admin-badge">Admin User</div>
      </div>

      <div class="profile-grid">
        <!-- User Info Card -->
        <div class="profile-card user-info">
          <h2>Account Information</h2>
          <div class="info-group">
            <label>Name:</label>
            <p>{{ user.name }}</p>
          </div>
          <div class="info-group">
            <label>Email:</label>
            <p>{{ user.email }}</p>
          </div>
          <div class="info-group">
            <label>Member Since:</label>
            <p>{{ memberSince }}</p>
          </div>
        </div>

        <!-- About Me Card -->
        <div class="profile-card about-me">
          <h2>About Me</h2>
          <div v-if="!isEditing">
            <p v-if="user.aboutMe">{{ user.aboutMe }}</p>
            <p v-else class="placeholder-text">Tell us about yourself...</p>
            <button @click="startEditing" class="btn-edit">Edit</button>
          </div>
          <div v-else class="edit-form">
            <textarea 
              v-model="editedAboutMe" 
              rows="4" 
              placeholder="Tell us about yourself..."
            ></textarea>
            <div class="button-group">
              <button @click="saveChanges" class="btn-save">Save</button>
              <button @click="cancelEditing" class="btn-cancel">Cancel</button>
            </div>
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
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UserProfile',
  
  setup() {
    const store = useStore()
    const isEditing = ref(false)
    const editedAboutMe = ref('')

    const user = computed(() => store.state.auth.user)
    const isAdmin = computed(() => user.value?.email === 'admin@example.com')
    const memberSince = computed(() => new Date().toLocaleDateString()) // Placeholder

    const startEditing = () => {
      editedAboutMe.value = user.value.aboutMe || ''
      isEditing.value = true
    }

    const saveChanges = () => {
      store.dispatch('auth/updateAboutMe', editedAboutMe.value)
      isEditing.value = false
    }

    const cancelEditing = () => {
      editedAboutMe.value = user.value.aboutMe || ''
      isEditing.value = false
    }

    return {
      user,
      isAdmin,
      memberSince,
      isEditing,
      editedAboutMe,
      startEditing,
      saveChanges,
      cancelEditing
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
</style> 