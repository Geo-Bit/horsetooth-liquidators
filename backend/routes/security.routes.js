const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')

const cameras = {
  '1': {
    location: 'Front Entrance',
    model: 'Hikvision DS-2CD2132F-I',
    username: 'admin',
    password: '12345',
    stream: 'front-entrance.jpg'
  },
  '2': {
    location: 'Storage Room',
    model: 'Dahua IPC-HFW4431R-Z',
    username: 'admin',
    password: 'admin123',
    stream: 'storage-room.jpg'
  }
}

const checkSlyFox = (req, res, next) => {
  try {
    // Get token from Authorization header or query parameter
    let token = null
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1]
    } else if (req.query.token) {
      token = req.query.token
    }

    if (!token) {
      return res.status(401).send('Authentication required')
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-default-secret-key')
    if (decoded.username !== 'sly_fox') {
      return res.status(403).send('Access denied: Only sly_fox can access camera feeds')
    }

    next()
  } catch (error) {
    console.error('Auth error:', error)
    return res.status(401).send('Invalid authentication')
  }
}

const cameraAuth = (req, res, next) => {
  const cameraId = req.params.cameraId
  const camera = cameras[cameraId]
  
  if (!camera) {
    return res.status(404).send('Camera not found')
  }

  const credentials = basicAuth(req)
  
  if (!credentials || 
      credentials.name !== camera.username || 
      credentials.pass !== camera.password) {
    res.setHeader('WWW-Authenticate', 
      `Basic realm="Security Camera ${cameraId}", charset="UTF-8"`)
    return res.status(401).send('Camera authentication required')
  }
  
  next()
}

// Use both auth middlewares and add CORS headers
router.get('/camera/:cameraId/stream', checkSlyFox, cameraAuth, (req, res) => {
  const cameraId = req.params.cameraId
  const imagePath = path.join(__dirname, `../public/camera-feeds/${cameras[cameraId].stream}`)
  
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Camera feed not found')
  }
  
  // Add CORS and resource policy headers
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  
  res.sendFile(imagePath)
})

module.exports = router 