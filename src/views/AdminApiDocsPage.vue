<template>
  <div class="api-docs-page">
    <div class="container">
      <h1>Admin API Documentation</h1>
      <AdminApiDocs />
    </div>
  </div>
</template>

<script>
import AdminApiDocs from '@/components/AdminApiDocs.vue'

export default {
  name: 'AdminApiDocsPage',
  components: {
    AdminApiDocs
  }
}
</script>

<style scoped>
.api-docs-page {
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style> 