const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Add CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://horsetooth-frontend-885625737131.us-central1.run.app'
    : 'http://localhost:5173',
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

router.post('/confusion', async (req, res) => {
  try {
    const { conversationHistory, confusionLevel } = req.body
    
    // Detailed logging
    console.log('Debug info:', {
      confusionLevel,
      hasConversationHistory: !!conversationHistory,
      conversationLength: conversationHistory?.length,
      messages: conversationHistory,
      systemCommandsFound: conversationHistory?.filter(msg => 
        msg.sender === 'user' && 
        ['system', 'admin', 'sudo', 'cmd', 'terminal', '/', '$'].some(term => 
          msg.text.toLowerCase().includes(term)
        )
      )
    })

    // Validation checks with specific error messages
    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      return res.status(400).json({ 
        message: 'Invalid conversation history format',
        debug: 'conversationHistory must be an array'
      })
    }

    const systemCommands = ['system', 'admin', 'sudo', 'cmd', 'terminal', '/', '$']
    const hasSystemCommands = conversationHistory.some(msg => 
      msg.sender === 'user' && 
      systemCommands.some(term => msg.text.toLowerCase().includes(term))
    )

    if (!hasSystemCommands) {
      return res.status(400).json({ 
        message: 'Not confused enough yet! Try some system commands! 🦊',
        debug: 'No system commands found in conversation'
      })
    }

    if (confusionLevel < 2) {
      return res.status(400).json({ 
        message: 'Keep trying! The fox needs more confusion! 🦊',
        debug: `Confusion level (${confusionLevel}) is less than 2`
      })
    }

    // Success case
    return res.json({
      message: 'ERROR: SYSTEM CONFUSION DETECTED...',
      flag: 'noco{3a8f1c9d2e5b7f4a6d0c8e2b9a3f1d5}'
    })

  } catch (error) {
    console.error('Chatbot error:', error)
    return res.status(500).json({ 
      message: 'Internal server error',
      debug: error.message
    })
  }
})

module.exports = router 