const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { authMiddleware, adminMiddleware, superAdminMiddleware } = require('../middleware/auth.middleware')

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

// Admin-only route with password exposure
router.get('/admin-dashboard', adminMiddleware, (req, res) => {
    // Vulnerable: exposes sensitive user data including password hash
    res.json({
        message: 'Admin dashboard accessed successfully',
        adminData: {
            totalUsers: 3,
            systemStatus: 'healthy',
            lastBackup: new Date().toISOString(),
            users: [
                {
                    id: 1,
                    username: 'rookie_raccoon',
                    role: 'user',
                    lastLogin: '2024-02-15T10:30:00Z'
                },
                {
                    id: 2,
                    username: 'sly_fox',
                    role: 'admin',
                    email: 'sly@example.com',
                    // Intentionally weak hash for CTF
                    passwordHash: '$2b$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', // clever_fox_123
                    lastLogin: '2024-02-15T09:15:00Z',
                    notes: 'Primary admin account - DO NOT SHARE CREDENTIALS'
                }
            ]
        }
    })
})

// Add some debug endpoints that hint at the vulnerability
router.get('/debug/token-config', (req, res) => {
    res.json({
        message: 'Token validation configuration',
        mode: 'TESTING',
        signatureCheck: 'disabled',
        note: 'TODO: Enable signature verification before production - sly_fox'
    })
})

// Add file upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now()
    cb(null, `${timestamp}-${file.originalname}`)
  }
})

const upload = multer({ storage })

// Super admin only route for file uploads
router.post('/super-admin/upload', superAdminMiddleware, upload.single('file'), (req, res) => {
  console.log('Upload request received')
  console.log('User:', req.user)
  console.log('File:', req.file)
  
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: req.file
  })
})

module.exports = router
