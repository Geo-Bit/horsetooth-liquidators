const express = require('express')
const router = express.Router()
const basicAuth = require('basic-auth')
const path = require('path')
const fs = require('fs')
const { adminMiddleware } = require('../middleware/auth.middleware')

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

// Basic auth middleware
const cameraAuth = (req, res, next) => {
  console.log('Basic auth middleware triggered')
  const credentials = basicAuth(req)
  const cameraId = req.params.cameraId
  
  if (!credentials || !cameras[cameraId]) {
    // Include camera model in the realm to hint at default credentials
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 
      `Basic realm="Security Camera Feed - ${cameras[cameraId]?.model || ''}"`)
    res.setHeader('Content-Type', 'text/plain')
    return res.end('Authentication required')
  }

  console.log('Checking credentials:', credentials.name, credentials.pass)
  
  if (credentials.name === cameras[cameraId].username && 
      credentials.pass === cameras[cameraId].password) {
    next()
  } else {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 
      `Basic realm="Security Camera Feed - ${cameras[cameraId].model}"`)
    res.setHeader('Content-Type', 'text/plain')
    return res.end('Invalid credentials')
  }
}

// Get camera stream (requires both JWT and basic auth)
router.get('/camera/:cameraId/stream', cameraAuth, (req, res) => {
  const cameraId = req.params.cameraId
  console.log('Streaming camera:', cameraId)
  
  const imagePath = path.join(__dirname, `../public/camera-feeds/${cameras[cameraId].stream}`)
  console.log('Image path:', imagePath)
  
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Camera feed not found')
  }
  
  res.sendFile(imagePath)
})

module.exports = router 