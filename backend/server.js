require('dotenv').config()
const validateEnv = require('./config/env.validation')

// Validate environment variables before starting the server
validateEnv()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

// Import routes
const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')
const orderRoutes = require('./routes/order.routes')
const userRoutes = require('./routes/user.routes')

const app = express()

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourproductiondomain.com' 
    : 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Static files
app.use(express.static(path.join(__dirname, '../dist')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)

// Serve frontend for any other route in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 