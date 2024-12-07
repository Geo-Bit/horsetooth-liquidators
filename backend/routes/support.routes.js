const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/auth.middleware')
const cors = require('cors')

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://horsetooth-frontend-885625737131.us-central1.run.app'
    : 'http://localhost:5173',
  credentials: true,
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

router.post('/ticket', cors(corsOptions), authMiddleware, async (req, res) => {
  try {
    const { message } = req.body

    // Only return the admin panel HTML if authenticated and support tag present
    if (message.toLowerCase().includes('@support')) {
      return res.json({ 
        success: true, 
        adminPanel: `
          <div id="admin-panel">
            <h2>Support Admin Panel</h2>
            <div class="agent-info">
              Logged in as: Admin
              <br>
              Access Level: Super Admin
              <br>
              System Flag: noco{3b1b11d6f84e53d3c99327b324f506d9}
            </div>
          </div>
        `,
        message: 'Support ticket created'
      })
    }

    res.json({ 
      success: true, 
      message: 'Review submitted successfully'
    })

  } catch (error) {
    console.error('Support ticket error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error'
    })
  }
})

module.exports = router 