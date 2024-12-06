<script>
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ChatBot from './components/ChatBot.vue'
import store from './store'

export default {
  name: 'App',
  components: {
    NavBar,
    LoadingSpinner,
    ChatBot
  },
  setup() {
    const loading = ref(true)

    onMounted(async () => {
      try {
        await store.dispatch('auth/checkAuth')
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      loading
    }
  }
}
</script>

<template>
  <div id="app">
    <nav-bar v-if="!loading"/>
    <router-view v-if="!loading"/>
    <loading-spinner v-else/>
    <chat-bot/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.loading {
  text-align: center;
  padding: 2rem;
}

#app {
  position: relative;
  min-height: 100vh;
  padding-top: 80px;
}

@media (max-width: 768px) {
  #app {
    padding-top: 60px;
  }
}

.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>