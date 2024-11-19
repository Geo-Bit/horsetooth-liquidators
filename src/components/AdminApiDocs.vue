<template>
  <div class="api-docs">
    <div class="api-version">
      <span class="version-badge">v1.0</span>
      <span class="debug-badge">DEBUG MODE</span>
    </div>

    <!-- Add API Documentation Header with Context -->
    <div class="api-header">
      <h2>Internal API Documentation</h2>
      <div class="api-info">
        <p class="api-meta">Last updated by: rookie_raccoon (Junior Backend Developer)</p>
        <p class="api-meta">Status: In Development</p>
        <div class="developer-note">
          <strong>Developer Notes:</strong>
          <p>
            Started this documentation during my summer internship (2024). Still learning the ropes of API security, 
            but sly_fox has been a great mentor. Currently working on implementing proper token validation - 
            disabled for testing as requested by the team.
          </p>
          <p class="todo-note">
            TODO: Review security practices with sly_fox before pushing to production.
            Need to understand why we're exposing user details in the admin dashboard response.
          </p>
        </div>
      </div>
    </div>

    <div class="endpoint-list">
      <!-- User Management -->
      <div class="endpoint-group">
        <h3>🔐 User Management</h3>
        <p class="section-note">
          APIs developed by rookie_raccoon under supervision of sly_fox.
          <br>
          <em>Note: Some endpoints may expose sensitive data in debug mode.</em>
        </p>
        
        <div class="endpoint">
          <div class="method get">GET</div>
          <div class="path">/api/users/admin-dashboard</div>
          <div class="description">
            Get admin dashboard data including user details
            <div class="developer-comment">
              <!-- Add personal context -->
              <em>Added during my first week - need to review data exposure with sly_fox</em>
            </div>
            <div class="response-preview">
              <pre>
{
  "adminData": {
    "totalUsers": 3,
    "systemStatus": "healthy",
    "users": [
      {
        "id": 1,
        "username": "rookie_raccoon",
        "role": "user",
        "notes": "Junior backend developer, started Summer 2024"
      },
      {
        "id": 2,
        "username": "sly_fox",
        "role": "admin",
        "email": "sly@example.com",
        "passwordHash": "$2b$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa",
        "notes": "Primary admin account - Senior Developer"
      }
    ]
  }
}</pre>
            </div>
            <span class="debug-note">⚠️ Warning: Contains sensitive user data in debug mode</span>
          </div>
        </div>

        <div class="endpoint">
          <div class="method get">GET</div>
          <div class="path">/api/users/debug/token-config</div>
          <div class="description">
            Get token validation configuration
            <div class="developer-comment">
              <em>My first API endpoint! Added during JWT implementation training</em>
            </div>
            <div class="response-preview">
              <pre>
{
  "message": "Token validation configuration",
  "mode": "TESTING",
  "signatureCheck": "disabled",
  "note": "TODO: Enable signature verification before production - sly_fox"
}</pre>
            </div>
            <span class="debug-note">⚠️ Debug endpoint exposed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminApiDocs'
}
</script>

<style scoped>
.api-docs {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.api-version {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.version-badge {
  background: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}

.debug-badge {
  background: #ffc107;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
}

.endpoint-group {
  margin: 30px 0;
}

.endpoint-group h3 {
  margin-bottom: 15px;
  color: #333;
}

.endpoint {
  background: white;
  padding: 20px;
  border-radius: 6px;
  margin: 15px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.method {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  margin-right: 10px;
  font-family: monospace;
}

.get { 
  background: #61affe; 
  color: white; 
}

.path {
  display: inline-block;
  font-family: monospace;
  font-size: 1.1em;
  color: #333;
}

.description {
  margin-top: 10px;
  color: #666;
}

.response-preview {
  margin-top: 10px;
  background: #272822;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

.response-preview pre {
  color: #f8f8f2;
  margin: 0;
  font-family: monospace;
  font-size: 0.9em;
}

.debug-note {
  display: block;
  margin-top: 8px;
  color: #dc3545;
  font-size: 0.9em;
  font-weight: 500;
}

.api-header {
  margin: 20px 0 30px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #dee2e6;
}

.api-info {
  margin-top: 15px;
}

.api-meta {
  color: #666;
  margin: 5px 0;
  font-size: 0.9em;
}

.developer-note {
  margin-top: 15px;
  padding: 15px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

.todo-note {
  margin-top: 10px;
  color: #721c24;
  font-size: 0.9em;
}

.section-note {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.developer-comment {
  margin: 8px 0;
  font-size: 0.9em;
  color: #6c757d;
  padding-left: 10px;
  border-left: 3px solid #6c757d;
}
</style> 