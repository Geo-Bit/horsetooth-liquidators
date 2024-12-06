const express = require('express')
const router = express.Router()
const cors = require('cors')
const authController = require('../controllers/auth.controller')

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://horsetooth-frontend-885625737131.us-central1.run.app'
    : 'http://localhost:5173',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

router.post('/login', cors(corsOptions), authController.login)

// Add OPTIONS handling
router.options('/login', cors(corsOptions))

// Basic route for testing
router.get('/test', (req, res) => {
    res.json({ message: 'Auth route working' })
})

module.exports = router 