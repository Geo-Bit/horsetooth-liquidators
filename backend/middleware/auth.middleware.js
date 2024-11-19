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

const superAdminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Check for super_admin role
    if (decoded.role !== 'super_admin') {
      return res.status(403).json({
        message: 'Access denied: Requires super admin permissions',
        debug: 'Only super_admin users can access this endpoint'
      })
    }

    next()
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = { authMiddleware, adminMiddleware, superAdminMiddleware } 