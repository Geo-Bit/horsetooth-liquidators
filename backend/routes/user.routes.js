const express = require('express')
const router = express.Router()
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware')

// Public route
router.get('/test', (req, res) => {
    res.json({ message: 'User routes working' })
})

// Protected route (any authenticated user)
router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Protected route accessed successfully',
        user: req.user
    })
})

// Admin-only route
router.get('/admin-dashboard', adminMiddleware, (req, res) => {
    res.json({
        message: 'Admin dashboard accessed successfully',
        adminData: {
            totalUsers: 3,
            systemStatus: 'healthy',
            lastBackup: new Date().toISOString()
        }
    })
})

module.exports = router
