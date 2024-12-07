const express = require('express')
const router = express.Router()
const cors = require('cors')

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://horsetooth-frontend-885625737131.us-central1.run.app', 'https://horsetooth.noco.io']
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Key'],
  credentials: true
}

// Simple middleware to check API key
const apiKeyCheck = (req, res, next) => {
  const apiKey = req.headers['x-api-key']
  if (apiKey !== 'diagnostic-system-2024') {
    return res.status(401).json({ message: 'Invalid API key' })
  }
  next()
}

// Pre-flight request handling
router.options('/404-check', cors(corsOptions))

router.post('/404-check', cors(corsOptions), apiKeyCheck, async (req, res) => {
  try {
    const diagnosticSteps = [
      { text: 'Initializing system diagnostic...', type: 'info', delay: 500 },
      { text: 'Checking file system integrity...', type: 'info', delay: 800 },
      { text: 'Scanning for missing resources...', type: 'info', delay: 1000 },
      { text: 'ERROR: Corrupted file header detected', type: 'error', delay: 600 },
      { text: 'Attempting to recover file fragments...', type: 'info', delay: 1200 },
      { text: 'ALERT: Hidden data fragment identified', type: 'alert', delay: 1000 },
      { text: 'Decrypting data...', type: 'info', delay: 1500 },
      { text: 'Decryption complete. Memory fragment recovered.', type: 'success', delay: 500 }
    ]

    res.json({
      success: true,
      diagnosticSteps,
      flag: 'noco{7d48af9e1b5c8f2d36a0e4x9n2p5q7r}'
    })

  } catch (error) {
    console.error('Diagnostic error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

module.exports = router 