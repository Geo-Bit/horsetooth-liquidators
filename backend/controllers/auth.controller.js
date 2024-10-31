const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../config/database')

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body
            console.log('Login attempt for username:', username)

            // Input validation
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' })
            }

            // Query user
            const result = await pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            )

            const user = result.rows[0]

            // User not found
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }

            // Compare password
            const validPassword = await bcrypt.compare(password, user.password_hash)
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }

            // Generate JWT
            const token = jwt.sign(
                { 
                    id: user.id, 
                    username: user.username,
                    role: user.role 
                },
                process.env.JWT_SECRET || 'your-default-secret-key',
                { expiresIn: '1h' }
            )

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            })

        } catch (error) {
            console.error('Login error:', error)
            res.status(500).json({ 
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        }
    }
}

module.exports = new AuthController() 