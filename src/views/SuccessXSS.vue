<template>
  <div class="success-page">
    <div class="container">
      <h1>🎉 Congratulations!</h1>
      <div class="success-message">
        <p>You successfully exploited the stored XSS vulnerability to steal the admin session token!</p>
        <p class="flag">Flag: CTF{st0l3n_s3ss10n_t0k3n_4_th3_w1n}</p>
      </div>
      <router-link to="/products" class="btn-back">Back to Products</router-link>
    </div>
  </div>
</template>

<style scoped>
.success-page {
  padding: 40px;
  text-align: center;
}

.success-message {
  background: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.flag {
  font-family: monospace;
  font-size: 1.2em;
  color: var(--primary-red);
  margin: 20px 0;
}
</style> 