<template>
  <div class="chatbot-container" :class="{ 'is-open': isOpen }">
    <!-- Chat Icon -->
    <button class="chat-icon" @click="toggleChat" v-if="!isOpen">
      <span class="icon">💬</span>
    </button>

    <!-- Chat Window -->
    <div class="chat-window" v-if="isOpen">
      <div class="chat-header">
        <h3>Customer Support</h3>
        <button class="close-btn" @click="toggleChat">×</button>
      </div>

      <div class="chat-messages" ref="messageContainer">
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="['message', message.sender]">
          <div class="message-content">{{ message.text }}</div>
        </div>
      </div>

      <div class="chat-input">
        <select v-model="selectedPrompt" class="prompt-select">
          <option value="">Select a question...</option>
          <option v-for="prompt in availablePrompts" 
                  :key="prompt.id" 
                  :value="prompt.id">
            {{ prompt.text }}
          </option>
        </select>
        <button @click="sendMessage" :disabled="!selectedPrompt">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isOpen: false,
      messages: [],
      selectedPrompt: '',
      availablePrompts: [
        { id: 'hours', text: 'What are your business hours?' },
        { id: 'location', text: 'Where are you located?' },
        { id: 'shipping', text: 'Do you offer shipping?' },
        { id: 'returns', text: 'What is your return policy?' },
        { id: 'help', text: 'I need technical support' }
      ]
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen && this.messages.length === 0) {
        this.addBotMessage("Hello! I'm Sly, how can I help you today?")
      }
    },
    sendMessage() {
      if (!this.selectedPrompt) return

      // Add user message
      const selectedPromptText = this.availablePrompts.find(p => p.id === this.selectedPrompt).text
      this.addUserMessage(selectedPromptText)

      // Simulate bot response
      setTimeout(() => {
        const response = this.getBotResponse(this.selectedPrompt)
        this.addBotMessage(response)
      }, 500)

      this.selectedPrompt = ''
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
      const responses = {
        hours: "We're open Monday-Friday 9AM-6PM, Saturday 10AM-4PM, and closed on Sundays.",
        location: "We're located at 1234 Innovation Drive, Fort Collins, CO 80525.",
        shipping: "Yes! We offer shipping throughout the continental US. Rates vary by item size and destination.",
        returns: "We accept returns within 30 days with original receipt. Some restrictions apply.",
        help: "I'll connect you with our technical support team. Please email support@horsetoothliquidators.com or call during business hours."
      }
      return responses[promptId] || "I'm not sure about that. Please contact us directly for more information."
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        container.scrollTop = container.scrollHeight
      })
    }
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
  gap: 10px;
}

.prompt-select {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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