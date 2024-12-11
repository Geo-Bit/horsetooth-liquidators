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
      version: "1.0",
      environment: process.env.NODE_ENV,
      debugMode: true,
      ctfChallenge: {
        name: "JWT Token Challenge",
        status: "COMPLETED",
        flag: "noco{3d35e2b64d5300c61c179814a9ca2460}",
        message: "Congratulations! You've successfully modified your JWT token to gain admin access."
      },
      adminUsers: [
        {
          username: "sly_fox",
          role: "admin",
          lastLogin: "2024-03-15",
          notes: "Primary system administrator"
        }
      ],
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

router.get('/dashboard', cors(corsOptions), adminMiddleware, async (req, res) => {
  try {
    // If user has successfully accessed admin panel through JWT modification
    if (req.user.role === 'admin') {
      return res.json({
        success: true,
        message: "Admin access granted",
        // First flag for successful JWT modification
        jwtFlag: "noco{jwt_t0k3ns_4r3_n0t_s3cur3}",
        adminData: {
          systemStatus: "Debug Mode Active",
          users: [
            {
              username: "sly_fox",
              role: "admin",
              lastLogin: "2024-03-15",
              // Second flag will be sly's cracked password hash
              passwordHash: "$2b$10$HhALUZvWxVXUhwVtStm1f.KJYdy4EX.INUv6OPvnQAlXFE9iNHUcO",
              notes: "Primary system administrator"
            }
          ]
        }
      })
    }

    // Regular response for non-admin users
    return res.json({
      success: false,
      message: "Insufficient permissions"
    })

  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router 