const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");

// Load environment variables
dotenv.config();

// Create app instance
const app = express();

app.set("view engine", "ejs");

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a test route
app.get("/", (req, res) => {
  res.render("index", { message: "Welcome to Horsetooth Liquidators Inc." });
});

// Use product routes
app.use("/products", productRoutes);
app.use(express.static("public"));

// Set up server to listen on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
