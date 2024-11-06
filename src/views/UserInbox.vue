<template>
  <div class="inbox-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        Loading messages...
      </div>

      <!-- Error State -->
      <div v-else-if="!user" class="error-state">
        <p>Please log in to view your messages</p>
        <router-link to="/" class="btn-back">Back to Home</router-link>
      </div>

      <!-- Messages Content -->
      <template v-else>
        <div class="inbox-header">
          <h1>Messages</h1>
        </div>

        <div class="messages-grid">
          <!-- Inbox Section -->
          <div class="messages-card">
            <h2>Inbox</h2>
            <div class="messages-list">
              <div v-for="message in inboxMessages" :key="message.id" class="message-item">
                <div class="message-header">
                  <span class="message-from">From: {{ message.from }}</span>
                  <span class="message-date">{{ formatDate(message.date) }}</span>
                </div>
                <div class="message-subject">{{ message.subject }}</div>
                <div class="message-content">{{ message.content }}</div>
              </div>
            </div>
          </div>

          <!-- Outbox Section -->
          <div class="messages-card">
            <h2>Sent Messages</h2>
            <div class="messages-list">
              <div v-for="message in outboxMessages" :key="message.id" class="message-item">
                <div class="message-header">
                  <span class="message-to">To: {{ message.to }}</span>
                  <span class="message-date">{{ formatDate(message.date) }}</span>
                </div>
                <div class="message-subject">{{ message.subject }}</div>
                <div class="message-content">{{ message.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// Hardcoded messages for CTF
const MESSAGES_DATA = {
  'rookie_raccoon': {
    inbox: [
      {
        id: 1,
        from: 'mr_badger',
        subject: 'Server Room Access',
        content: 'Hey rookie, the access code to the server room is still 1234. Don\'t forget to change it next week!',
        date: '2024-03-15T10:30:00'
      },
      {
        id: 2,
        from: 'sly_fox',
        subject: 'RE: Backup Schedule',
        content: 'Thanks for setting up the backup schedule. Remember our AWS access key is AKIA1234EXAMPLE. Keep it safe!',
        date: '2024-03-14T15:45:00'
      }
    ],
    outbox: [
      {
        id: 3,
        to: 'sly_fox',
        subject: 'Database Credentials',
        content: 'Here are the staging DB credentials you asked for: user=admin, pass=staging123',
        date: '2024-03-13T09:15:00'
      }
    ]
  }
  // Add more users as needed
}

export default {
  name: 'UserInbox',
  
  setup() {
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)

    const user = computed(() => store.getters['auth/user'])
    
    const inboxMessages = computed(() => {
      return user.value ? (MESSAGES_DATA[user.value.username]?.inbox || []) : []
    })

    const outboxMessages = computed(() => {
      return user.value ? (MESSAGES_DATA[user.value.username]?.outbox || []) : []
    })

    onMounted(async () => {
      if (!store.getters['auth/isAuthenticated']) {
        router.push('/login')
        return
      }
      loading.value = false
    })

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleString()
    }

    return {
      user,
      loading,
      inboxMessages,
      outboxMessages,
      formatDate
    }
  }
}
</script>

<style scoped>
.inbox-page {
  padding: 40px 0;
}

.inbox-header {
  margin-bottom: 30px;
}

.messages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.messages-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.message-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.message-item:last-child {
  border-bottom: none;
}

.message-header {
  display: flex;
  justify-content: space-between;
  color: var(--rock-gray);
  font-size: 0.9em;
  margin-bottom: 8px;
}

.message-subject {
  font-weight: bold;
  color: var(--secondary-blue);
  margin-bottom: 8px;
}

.message-content {
  color: var(--rock-gray);
  white-space: pre-wrap;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
}

.btn-back {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--secondary-blue);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .messages-grid {
    grid-template-columns: 1fr;
  }
}
</style> 