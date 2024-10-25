const express = require("express");
const router = express.Router();

// Define product list route
router.get("/", (req, res) => {
  res.render("products", {
    products: [
      { name: "Widget A", price: 10 },
      { name: "Widget B", price: 20 },
    ],
  });
});

module.exports = router;
