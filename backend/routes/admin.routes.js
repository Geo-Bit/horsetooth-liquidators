const express = require('express')
const router = express.Router()
const { adminMiddleware } = require('../middleware/auth.middleware')
const cors = require('cors')

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://horsetooth-frontend-885625737131.us-central1.run.app'
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

// Add OPTIONS handling
router.options('/api-docs', cors(corsOptions))

router.get('/api-docs', cors(corsOptions), adminMiddleware, async (req, res) => {
  try {
    const apiDocs = {
      version: "v1.0",
      debugMode: true,
      lastUpdated: "2024-03-10",
      updatedBy: "rookie_raccoon",
      endpoints: [
        {
          method: "GET",
          path: "/api/users/admin-dashboard",
          description: "Get admin dashboard data including user details",
          sampleResponse: {
            adminData: {
              totalUsers: 3,
              systemStatus: "healthy",
              users: [
                {
                  id: 1,
                  username: "rookie_raccoon",
                  role: "user",
                  notes: "Junior backend developer, started Summer 2024"
                },
                {
                  id: 2,
                  username: "sly_fox",
                  role: "admin",
                  email: "sly@example.com",
                  passwordHash: "$2b$10$msFIaGa8rsd1idWuilE4B.uoHK6YMqz9nEX.KPaZ41AodK9XHoNbG",
                  notes: "Primary admin account - Senior Developer"
                }
              ]
            }
          }
        }
      ]
    }

    res.json(apiDocs)
  } catch (error) {
    console.error('API docs error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router 