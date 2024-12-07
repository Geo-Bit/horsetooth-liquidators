<template>
  <div class="api-docs" v-if="apiDocs">
    <h2>API Documentation</h2>
    <div class="api-version">
      <span class="version-badge">{{ apiDocs.version }}</span>
      <span class="debug-badge" v-if="apiDocs.debugMode">DEBUG MODE</span>
    </div>

    <div class="endpoint-list">
      <div class="endpoint-group">
        <h3>🔐 User Management</h3>
        
        <div v-for="endpoint in apiDocs.endpoints" :key="endpoint.path" class="endpoint">
          <div class="method get">{{ endpoint.method }}</div>
          <div class="path">{{ endpoint.path }}</div>
          <div class="description">
            {{ endpoint.description }}
            <div class="response-preview">
              <pre>{{ JSON.stringify(endpoint.sampleResponse, null, 2) }}</pre>
            </div>
            <span class="debug-note">⚠️ Note: Contains sensitive user data in debug mode</span>
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
  setup() {
    const store = useStore()
    const apiDocs = ref(null)

    const fetchApiDocs = async () => {
      try {
        const baseURL = process.env.NODE_ENV === 'production'
          ? 'https://horsetooth-backend-885625737131.us-central1.run.app'
          : 'http://localhost:3000'
        
        const token = store.getters['auth/token']
        const response = await axios.get(`${baseURL}/api/admin/api-docs`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        apiDocs.value = response.data
      } catch (error) {
        console.error('Error fetching API docs:', error)
      }
    }

    onMounted(fetchApiDocs)

    return {
      apiDocs
    }
  }
}
</script>

<style scoped>
.api-docs {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.api-version {
  margin-bottom: 20px;
}

.version-badge {
  background: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 10px;
}

.debug-badge {
  background: #ffc107;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
}

.endpoint {
  margin: 15px 0;
  padding: 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.method {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  margin-right: 10px;
}

.get { background: #61affe; color: white; }

.path {
  display: inline-block;
  font-family: monospace;
  font-size: 1.1em;
}

.description {
  margin-top: 10px;
  color: #666;
}

.response-preview {
  margin-top: 10px;
  background: #272822;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

.response-preview pre {
  color: #f8f8f2;
  margin: 0;
}

.debug-note {
  display: block;
  margin-top: 8px;
  color: #dc3545;
  font-size: 0.9em;
}
</style> 