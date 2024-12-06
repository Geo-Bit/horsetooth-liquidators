<template>
  <div class="api-docs">
    <h2>API Documentation</h2>
    <div class="api-version">
      <span class="version-badge">v1.0</span>
      <span class="debug-badge">DEBUG MODE</span>
    </div>

    <div class="endpoint-list">
      <!-- User Management -->
      <div class="endpoint-group">
        <h3>🔐 User Management</h3>
        
        <div class="endpoint">
          <div class="method get">GET</div>
          <div class="path">/api/users/admin-dashboard</div>
          <div class="description">
            Get admin dashboard data including user details
            <div class="response-preview">
              <pre>
{
  "adminData": {
    "users": [
      {
        "username": "sly_fox",
        "role": "admin",
        "passwordHash": "***********",
        // ... other sensitive data
      }
    ]
  }
}
              </pre>
            </div>
            <span class="debug-note">⚠️ Note: Contains sensitive user data in debug mode</span>
          </div>
        </div>

        <!-- Add other endpoints -->
        <div class="endpoint">
          <div class="method get">GET</div>
          <div class="path">/api/users/profile</div>
          <div class="description">Get user profile data</div>
        </div>
      </div>
    </div>
  </div>
</template>

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