const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create app instance
const app = express();

app.set('view engine', 'ejs');

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a test route
app.get('/', (req, res) => {
  res.render('index', { message: 'Welcome to Horsetooth Liquidators Inc.' });
});

// Use product and user routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use(express.static('public'));

// Set up server to listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log();
});

