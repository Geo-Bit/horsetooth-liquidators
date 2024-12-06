require('dotenv-flow').config()
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
const securityRoutes = require('./routes/security.routes')
const shellRoutes = require('./routes/shell.routes')
const chatbotRoutes = require('./routes/chatbot.routes')

const app = express()

// Configure helmet with cross-origin-resource-policy
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

// Update CORS options to allow credentials
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://horsetooth-frontend-885625737131.us-central1.run.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Add OPTIONS handling for preflight requests
app.options('*', cors(corsOptions));

app.use(express.json())

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'healthy' });
});

// Static files for product images only
app.use('/api/products/images', express.static(path.join(__dirname, 'public/product-images')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/security', securityRoutes)
app.use('/shell', shellRoutes)
app.use('/api/chatbot', chatbotRoutes)

// Add this after other middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Add more detailed logging
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Add early logging
console.log('Starting server with environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  CORS_ORIGIN: process.env.CORS_ORIGIN
});

// Always use 8080 for Cloud Run compatibility
const port = process.env.PORT || 8080;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    DB_HOST: process.env.DB_HOST,
    CORS_ORIGIN: process.env.CORS_ORIGIN
  });
}).on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Add graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Add this near your server startup
const BUILD_TIMESTAMP = new Date().toISOString();
console.log(`Server starting - Build: ${BUILD_TIMESTAMP}`); 

console.log('='.repeat(50));
console.log(`BUILD TIMESTAMP: ${BUILD_TIMESTAMP}`);
console.log('='.repeat(50));

// Configure CORS before any routes
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://horsetooth-frontend-885625737131.us-central1.run.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Add a test endpoint to verify CORS
app.get('/api/test-cors', (req, res) => {
  console.log('CORS Test endpoint hit');
  console.log('Origin:', req.headers.origin);
  console.log('CORS_ORIGIN env:', process.env.CORS_ORIGIN);
  res.json({ 
    message: 'CORS test endpoint',
    timestamp: BUILD_TIMESTAMP,
    corsOrigin: process.env.CORS_ORIGIN,
    headers: res.getHeaders() // This will show what headers are being set
  });
}); 

// Add a test endpoint to verify image paths
app.get('/api/test-image-path', (req, res) => {
  res.json({
    baseUrl: BASE_URL,
    sampleImagePath: `${BASE_URL}/api/products/images/commodore64.jpg`,
    environment: process.env.NODE_ENV
  });
}); 