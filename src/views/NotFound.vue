<template>
  <div class="not-found">
    <div class="retro-screen">
      <div class="screen-content">
        <div class="error-code">404</div>
        <div class="error-text">PAGE_NOT_FOUND</div>
        
        <!-- ASCII Art Fox -->
        <pre class="ascii-art">
    /\___/\
   (  o o  )
   (  =^=  ) 
    (______)
        </pre>
        
        <!-- Terminal-style message -->
        <div class="terminal-text">
          <span class="prompt">> </span>
          <span class="typing-text">ERROR: The requested file could not be found on this server.</span>
        </div>
        
        <!-- Diagnostic Output -->
        <div class="terminal-output" ref="terminalOutput">
          <div v-for="(line, index) in diagnosticLines" 
               :key="index" 
               :class="['terminal-line', { 'error-line': line.type === 'error' }]">
            <span class="prompt" v-if="line.prompt">> </span>
            {{ line.text }}
          </div>
        </div>

        <div v-if="showRecoveredData" class="secret-message">
          <span class="blink">> RECOVERED_FRAGMENT: {{ recoveredFragment }}</span>
        </div>
        
        <div class="options">
          <router-link to="/" class="terminal-btn">> Return_Home</router-link>
          <button @click="runDiagnostics" 
                  class="terminal-btn" 
                  :disabled="isRunningDiagnostics">
            {{ isRunningDiagnostics ? 'Running...' : '> Run_Diagnostics' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'

export default {
  name: 'NotFound',
  data() {
    return {
      showRecoveredData: false,
      isRunningDiagnostics: false,
      diagnosticLines: [],
      diagnosticsRun: 0,
      recoveredFragment: ''
    }
  },
  setup() {
    const store = useStore()
    return { store }
  },
  methods: {
    async runDiagnostics() {
      if (this.isRunningDiagnostics) return
      
      this.isRunningDiagnostics = true
      this.diagnosticLines = []

      try {
        const baseURL = process.env.NODE_ENV === 'production'
          ? 'https://horsetooth-backend-885625737131.us-central1.run.app/api'
          : 'http://localhost:3000/api'

        const response = await axios.post(`${baseURL}/diagnostics/404-check`, {}, {
          headers: {
            'X-API-Key': 'diagnostic-system-2024'
          }
        })

        const { diagnosticSteps, flag } = response.data

        for (const step of diagnosticSteps) {
          await this.addDiagnosticLine(step)
        }

        setTimeout(() => {
          this.showRecoveredData = true
          this.recoveredFragment = flag
        }, 1000)

      } catch (error) {
        console.error('Diagnostic error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        })
        
        this.addDiagnosticLine({
          text: 'ERROR: System diagnostic failed',
          type: 'error',
          delay: 0
        })
      } finally {
        this.isRunningDiagnostics = false
      }
    },

    async addDiagnosticLine(step) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.diagnosticLines.push({
            text: step.text,
            type: step.type || 'info',
            prompt: true
          })
          this.$nextTick(() => {
            if (this.$refs.terminalOutput) {
              this.$refs.terminalOutput.scrollTop = this.$refs.terminalOutput.scrollHeight
            }
          })
          resolve()
        }, step.delay)
      })
    }
  }
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', monospace;
  color: #33ff33;
}

.retro-screen {
  background-color: #001100;
  border: 20px solid #222;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 0 20px rgba(51, 255, 51, 0.3),
              inset 0 0 20px rgba(51, 255, 51, 0.3);
  max-width: 800px;
  width: 90%;
}

.screen-content {
  text-align: center;
}

.error-code {
  font-size: 6em;
  font-weight: bold;
  text-shadow: 0 0 10px #33ff33;
  margin-bottom: 20px;
}

.error-text {
  font-size: 2em;
  margin-bottom: 30px;
}

.ascii-art {
  font-family: monospace;
  white-space: pre;
  display: inline-block;
  cursor: help;
  margin: 20px 0;
  transition: all 0.3s ease;
}

.ascii-art:hover {
  text-shadow: 0 0 10px #33ff33;
  transform: scale(1.1);
}

.secret-message {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #33ff33;
  display: inline-block;
}

.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.terminal-text {
  margin: 20px 0;
  text-align: left;
  line-height: 1.5;
}

.prompt {
  color: #33ff33;
}

.typing-text {
  animation: typing 3s steps(60, end);
  white-space: nowrap;
  overflow: hidden;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.options {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.terminal-btn {
  background: transparent;
  border: 1px solid #33ff33;
  color: #33ff33;
  padding: 10px 20px;
  font-family: 'Courier New', monospace;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.terminal-btn:hover {
  background: #33ff33;
  color: #000;
  box-shadow: 0 0 10px #33ff33;
}

@media (max-width: 600px) {
  .error-code {
    font-size: 4em;
  }
  
  .error-text {
    font-size: 1.5em;
  }
  
  .options {
    flex-direction: column;
  }
}

.terminal-output {
  text-align: left;
  height: 200px;
  overflow-y: auto;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #33ff33;
  font-size: 0.9em;
  background: rgba(0, 17, 0, 0.7);
}

.terminal-line {
  margin: 5px 0;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.error-line {
  color: #ff3333;
}

.terminal-line[data-type="warning"] {
  color: #ffff33;
}

.terminal-line[data-type="alert"] {
  color: #ff9933;
}

.terminal-line[data-type="success"] {
  color: #33ff33;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.terminal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Add scan line effect */
.retro-screen::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 50%, 
    rgba(0, 0, 0, 0.05) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
}
</style> 