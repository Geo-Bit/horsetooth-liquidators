<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'
import ChatBot from './components/ChatBot.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    ChatBot
  },
  setup() {
    const store = useStore()
    const isLoading = ref(true)

    onMounted(async () => {
      await store.dispatch('auth/checkAuth')
      isLoading.value = false
    })

    return {
      isLoading
    }
  }
}
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view v-if="!isLoading"></router-view>
    <div v-else class="loading">Loading...</div>
    <ChatBot />
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
}
</style>