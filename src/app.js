const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create app instance
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a test route
app.get('/', (req, res) => {
  res.send('Welcome to Horsetooth Liquidators Inc.');
});

// Set up server to listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log();
});

