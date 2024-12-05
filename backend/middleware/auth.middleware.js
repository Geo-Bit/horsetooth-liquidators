const jwt = require('jsonwebtoken')

// Regular authentication (keep this secure)
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret-key')
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

// Vulnerable admin middleware (doesn't verify signature)
const adminMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' })
        }

        // Vulnerable: using decode() instead of verify()
        const decoded = jwt.decode(token)
        
        // Add a subtle hint in the error message
        if (decoded.role !== 'admin') {
            return res.status(403).json({ 
                message: 'Admin access required. Debug: Token validation mode - TESTING',
                hint: 'Contact sly_fox for proper validation configuration'
            })
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid token format',
            debug: 'Token signature verification disabled for testing'
        })
    }
}

const superAdminMiddleware = async (req, res, next) => {
  try {
    // Verify token first
    await authMiddleware(req, res, async () => {
      // Check if user is super_admin
      if (req.user.role !== 'super_admin') {
        return res.status(403).json({ message: 'Super Admin access required' })
      }
      next()
    })
  } catch (error) {
    console.error('Super Admin middleware error:', error)
    res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = { authMiddleware, adminMiddleware, superAdminMiddleware } 