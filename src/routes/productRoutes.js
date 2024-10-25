const express = require('express');
const router = express.Router();

// Define product list route
router.get('/', (req, res) => {
  res.render('products', { products: [{ id: 1, name: 'Widget A', price: 10 }, { id: 2, name: 'Widget B', price: 20 }] });
});

// Define product details route
router.get('/:id', (req, res) => {
  const products = [{ id: 1, name: 'Widget A', price: 10, description: 'A great widget.' }, { id: 2, name: 'Widget B', price: 20, description: 'An even better widget.' }];
  const product = products.find(p => p.id == req.params.id);
  if (product) {
    res.render('productDetails', { product });
  } else {
    res.status(404).send('Product not found');
  }
});

module.exports = router;

