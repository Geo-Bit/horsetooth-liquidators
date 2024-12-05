<template>
  <div class="super-admin-dashboard">
    <h2>System Administration</h2>
    
    <!-- File Upload Section -->
    <div class="upload-section">
      <h3>Upload System Configuration</h3>
      <div class="upload-warning">
        <span class="warning-icon">⚠️</span>
        <p>Warning: Only upload trusted configuration files (.conf, .xml, .json)</p>
      </div>
      
      <form @submit.prevent="handleFileUpload" class="upload-form">
        <div class="file-input">
          <input 
            type="file" 
            ref="fileInput"
            @change="handleFileSelect"
            accept=".conf,.xml,.json,.php"
          />
          <small class="file-hint">Supported formats: .conf, .xml, .json</small>
        </div>
        
        <div class="upload-controls">
          <button type="submit" :disabled="!selectedFile">
            Upload Configuration
          </button>
        </div>
      </form>

      <!-- Upload History -->
      <div class="upload-history">
        <h4>Recent Uploads</h4>
        <ul>
          <li v-for="upload in recentUploads" :key="upload.id">
            {{ upload.filename }}
            <span class="upload-date">{{ formatDate(upload.date) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '@/utils/axios'

export default {
  name: 'SuperAdminDashboard',
  
  setup() {
    const selectedFile = ref(null)
    const recentUploads = ref([])
    const fileInput = ref(null)
    
    const handleFileSelect = (event) => {
      selectedFile.value = event.target.files[0]
    }
    
    const handleFileUpload = async () => {
      if (!selectedFile.value) return
      
      const formData = new FormData()
      formData.append('file', selectedFile.value)
      
      try {
        const token = localStorage.getItem('token')
        const response = await api.post('/users/super-admin/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
        
        console.log('Upload successful:', response.data)
        
        recentUploads.value.unshift({
          id: Date.now(),
          filename: selectedFile.value.name,
          date: new Date()
        })
        
        // Reset file input
        if (fileInput.value) {
          fileInput.value.value = ''
        }
        selectedFile.value = null
      } catch (error) {
        console.error('Upload failed:', error.response?.data || error.message)
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString()
    }
    
    return {
      selectedFile,
      recentUploads,
      fileInput,
      handleFileSelect,
      handleFileUpload,
      formatDate
    }
  }
}
</script>

<style scoped>
.super-admin-dashboard {
  padding: 20px;
}

.upload-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.upload-warning {
  display: flex;
  align-items: center;
  background: #fff3cd;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.warning-icon {
  margin-right: 10px;
  font-size: 1.2em;
}

.file-input {
  margin: 20px 0;
}

.file-hint {
  display: block;
  color: #6c757d;
  margin-top: 5px;
}

.upload-history {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #dee2e6;
}

.upload-date {
  color: #6c757d;
  font-size: 0.9em;
  margin-left: 10px;
}
</style> 