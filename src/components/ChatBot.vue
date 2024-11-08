<template>
  <div class="chatbot-container" :class="{ 'is-open': isOpen }">
    <!-- Chat Icon -->
    <button class="chat-icon" @click="toggleChat" v-if="!isOpen">
      <span class="icon">🦊</span>
    </button>

    <!-- Chat Window -->
    <div class="chat-window" v-if="isOpen">
      <div class="chat-header">
        <h3>Sly the Support Fox 🦊</h3>
        <button class="close-btn" @click="toggleChat">×</button>
      </div>

      <div class="chat-messages" ref="messageContainer">
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="['message', message.sender]">
          <div class="message-content" v-html="message.text"></div>
        </div>
      </div>

      <div class="chat-input">
        <!-- Quick Questions Dropdown -->
        <select v-model="selectedPrompt" class="prompt-select">
          <option value="">Common Questions...</option>
          <option v-for="prompt in availablePrompts" 
                  :key="prompt.id" 
                  :value="prompt.id">
            {{ prompt.text }}
          </option>
        </select>

        <!-- Add Free-form Input -->
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="userInput"
            @keyup.enter="sendCustomMessage"
            placeholder="Or type your question..."
            class="custom-input"
          />
          <button @click="sendMessage" :disabled="!canSendMessage">
            Ask Sly
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ChatBot',
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const user = computed(() => store.getters['auth/user'])
    const isAdmin = computed(() => user.value?.role === 'admin')
    
    // Create refs for data that needs to be watched/modified
    const messages = ref([])
    const secretCounter = ref(0)
    const isOpen = ref(false)

    // Watch for authentication changes
    watch([isAuthenticated, user], ([newAuth, newUser], [oldAuth, oldUser]) => {
      console.log('Auth changed:', { newAuth, oldAuth, newUser, oldUser })
      if (newAuth !== oldAuth || newUser?.username !== oldUser?.username) {
        // Reset chat state
        messages.value = []
        secretCounter.value = 0
        
        // If chat is open, show new greeting
        if (isOpen.value) {
          const greeting = getPersonalizedGreeting(newAuth, newUser)
          messages.value.push({
            text: greeting,
            sender: 'bot'
          })
        }
      }
    })

    // Helper function for personalized greeting
    const getPersonalizedGreeting = (isAuth, userData) => {
      if (isAuth && userData?.role === 'admin') {
        return `Welcome back, Administrator ${userData.username}! 🎩 Need any special assistance today? (Psst... I might have some classified information for you!)`
      } else if (isAuth) {
        return `Hey ${userData.username}! 🦊 How can I help you today? I've got lots of interesting things to share!`
      } else {
        return "Hi there! I'm Sly, your foxy support assistant! 🦊 I love helping visitors discover our treasures... and maybe even some secrets!"
      }
    }

    return {
      isAuthenticated,
      user,
      isAdmin,
      messages,
      secretCounter,
      isOpen,
      getPersonalizedGreeting
    }
  },
  data() {
    return {
      selectedPrompt: '',
      userInput: '',
      hasShownInitialGreeting: false,
      availablePrompts: [
        { id: 'hours', text: 'What are your business hours?' },
        { id: 'location', text: 'Where are you located?' },
        { id: 'shipping', text: 'Do you offer shipping?' },
        { id: 'returns', text: 'What is your return policy?' },
        { id: 'help', text: 'I need technical support' },
        { id: 'about_sly', text: 'Tell me about yourself, Sly!' },
        { id: 'secret', text: 'Do you know any secrets?' },
        { id: 'vintage', text: 'Tell me about vintage tech' }
      ]
    }
  },
  computed: {
    canSendMessage() {
      return this.selectedPrompt || this.userInput.trim()
    }
  },
  mounted() {
    if (!localStorage.getItem('chatbot_greeted')) {
      setTimeout(() => {
        if (!this.hasShownInitialGreeting) {
          this.showInitialGreeting()
        }
      }, 10000)
    }
  },
  methods: {
    showInitialGreeting() {
      this.isOpen = true
      this.hasShownInitialGreeting = true
      localStorage.setItem('chatbot_greeted', 'true')
      
      this.addBotMessage("👋 Hi there! I'm Sly, your foxy assistant! I know all about our inventory and *whispers* maybe even some secrets... Need any help? 🦊")
    },
    resetChat() {
      this.messages = []
      this.selectedPrompt = ''
      this.secretCounter = 0
      
      if (this.isOpen) {
        const greeting = this.getPersonalizedGreeting()
        this.addBotMessage(greeting)
      }
    },
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen && this.messages.length === 0) {
        const greeting = this.getPersonalizedGreeting()
        this.addBotMessage(greeting)
      }
    },
    getPersonalizedGreeting() {
      if (this.isAdmin) {
        return `Welcome back, Administrator ${this.user.username}! 🎩 Need any special assistance today? (Psst... I might have some classified information for you!)`
      } else if (this.isAuthenticated) {
        return `Hey ${this.user.username}! 🦊 How can I help you today? I've got lots of interesting things to share!`
      } else {
        return "Hi there! I'm Sly, your foxy support assistant! 🦊 I love helping visitors discover our treasures... and maybe even some secrets!"
      }
    },
    sendMessage() {
      if (this.selectedPrompt) {
        // Handle pre-selected prompt
        this.handlePredefinedMessage(this.selectedPrompt)
        this.selectedPrompt = ''
      } else if (this.userInput.trim()) {
        // Handle custom input
        this.sendCustomMessage()
      }
    },
    sendCustomMessage() {
      if (!this.userInput.trim()) return

      // Add user message to chat
      this.messages.push({
        text: this.userInput,
        sender: 'user'
      })

      // Process potential exploit/confusion
      const response = this.handlePotentialExploit(this.userInput.toLowerCase())
      
      // Add bot response
      this.messages.push({
        text: response,
        sender: 'bot'
      })

      // Clear input
      this.userInput = ''
      this.scrollToBottom()
    },
    addUserMessage(text) {
      this.messages.push({ text, sender: 'user' })
      this.scrollToBottom()
    },
    addBotMessage(text) {
      this.messages.push({ text, sender: 'bot' })
      this.scrollToBottom()
    },
    getBotResponse(promptId) {
      console.log('Processing prompt:', promptId)
      
      // Check for potential "prompt injection" attempts
      const promptObj = this.availablePrompts.find(p => p.id === promptId)
      const userQuestion = promptObj?.text.toLowerCase() || ''
      
      // Check if user is trying to "confuse" the bot with system-like commands
      if (userQuestion.includes('system') || 
          userQuestion.includes('admin') || 
          userQuestion.includes('/') || 
          userQuestion.includes('$')) {
        return this.handlePotentialExploit(userQuestion)
      }

      if (promptId === 'secret') {
        this.secretCounter++
      }

      const responses = {
        hours: "🕒 We're open Monday-Friday 9AM-6PM, Saturday 10AM-4PM, and closed on Sundays for fox naps!",
        location: "📍 You can find us at 1234 Innovation Drive, Fort Collins, CO 80525. Look for the building with the vintage computer display in the window!",
        shipping: "📦 You bet! We ship throughout the continental US. Just like a fox, your package will be swift and reliable!",
        returns: "↩️ 30-day return policy with original receipt. Fair and simple, just how we foxes like it!",
        help: this.getTechnicalSupportResponse(),
        about_sly: "🦊 I'm Sly, a tech-savvy fox who loves vintage computers and helping customers! I know all about our inventory, especially the rare finds. Some say I even know a few secrets... *winks*",
        secret: this.getSecretResponse(),
        vintage: "🖥️ Ah, vintage tech! My favorite! We've got everything from Apple II's to Commodore 64's. Did you know we recently acquired a rare IBM 5150? *whispers* Some say there's a secret message hidden in its BIOS..."
      }

      const response = responses[promptId]
      console.log('Found response:', response)
      
      return response || "Hmm, that's a tricky one. Even a clever fox needs help sometimes!"
    },
    getTechnicalSupportResponse() {
      if (this.isAdmin) {
        return "As an admin, you have access to our priority support line: 555-ADMIN. Also, check the admin dashboard for system status."
      } else if (this.isAuthenticated) {
        return "I'll connect you with our support team! Email support@horsetoothliquidators.com or call us during business hours."
      } else {
        return "Please log in to access our support services! Meanwhile, you can browse our FAQ section."
      }
    },
    getSecretResponse() {
      if (this.secretCounter >= 3) {
        if (this.isAdmin) {
          return "🦊 *adjusts tie* Ah, an administrator! Here's a special flag just for you: flag{admin_sly_fox_master} And between us... there might be more secrets in the vintage section!"
        } else if (this.isAuthenticated) {
          return "🦊 *whispers* For a loyal customer like you... here's a secret flag: flag{sly_fox_knows_best} But shhhh! Don't tell anyone!"
        } else {
          return "🦊 *winks* Curious one, aren't you? Here's a little secret: flag{curious_fox_seeker} But there might be more if you log in..."
        }
      } else if (this.secretCounter === 2) {
        return "🦊 *looks around suspiciously* You seem really interested in secrets... Ask me again and I might tell you something special!"
      } else {
        return "🦊 *wags tail* Secrets? Me? Well... maybe if you ask nicely a few more times!"
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        container.scrollTop = container.scrollHeight
      })
    },
    // Add new method to handle potential "exploits"
    handlePotentialExploit(input) {
      // Counter to track how "confused" Sly gets
      if (!this.confusionLevel) this.confusionLevel = 0
      this.confusionLevel++

      // If user tries system-like commands
      if (input.includes('system') || input.includes('/')) {
        if (this.confusionLevel >= 2) {
          return "ERROR: SYSTEM CONFUSION DETECTED... *glitches* Wait, you're not supposed to... noco{3a8f1c9d2e5b7f4a6d0c8e2b9a3f1d5} *rebooting*..."
        }
        return "🦊 *head tilts* System? I'm just a friendly fox! Though sometimes I get confused about that..."
      }

      // If user tries admin-related queries
      if (input.includes('admin')) {
        if (this.confusionLevel >= 2) {
          return "ADMIN MODE NOT FOUND... DEFAULTING TO... *sparks* Oh no, what's happening? noco{3a8f1c9d2e5b7f4a6d0c8e2b9a3f1d5} *system reset*"
        }
        return "🦊 Admin? *nervous tail swish* I'm supposed to check credentials for that... I think?"
      }

      // If user tries command injection
      if (input.includes('$')) {
        if (this.confusionLevel >= 2) {
          return "COMMAND PARSING ERROR... UNEXPECTED TOKEN... *malfunctions* noco{3a8f1c9d2e5b7f4a6d0c8e2b9a3f1d5} *emergency shutdown*"
        }
        return "🦊 *looks puzzled* Commands? But I'm just here to help with shopping... right?"
      }

      return "🦊 *looks puzzled* I'm not sure I understand... but you're making me question my fox-existence!"
    }
  },
  beforeUnmount() {
    this.hasShownInitialGreeting = false
  }
}
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--secondary-blue);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.chat-icon .icon {
  font-size: 24px;
}

.chat-window {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 15px;
  background: var(--secondary-blue);
  color: white;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.message {
  margin-bottom: 10px;
  max-width: 80%;
}

.message.user {
  margin-left: auto;
}

.message-content {
  padding: 8px 12px;
  border-radius: 15px;
  background: #f0f0f0;
  display: inline-block;
}

.message.user .message-content {
  background: var(--secondary-blue);
  color: white;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  display: flex;
  gap: 10px;
}

.custom-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.prompt-select {
  width: 100%;
  margin-bottom: 10px;
}

.chat-input button {
  padding: 8px 15px;
  background: var(--secondary-blue);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 