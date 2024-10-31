const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)

// Basic route for testing
router.get('/test', (req, res) => {
    res.json({ message: 'Auth route working' })
})

module.exports = router 