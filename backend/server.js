require('dotenv').config()
const validateEnv = require('./config/env.validation')

// Validate environment variables before starting the server
validateEnv()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { initializeDatabase } = require('./config/database')

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json())

// Initialize database
initializeDatabase().catch(console.error)

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 