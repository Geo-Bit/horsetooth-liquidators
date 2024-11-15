const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/auth.middleware')
const pool = require('../config/database')

// List current user's orders
router.get('/', authMiddleware, async (req, res) => {
  console.log('Fetching orders for user:', req.user.id)
  
  try {
    const result = await pool.query(
      `SELECT 
        o.id,
        o.user_id as "userId",
        o.date,
        o.status,
        o.total,
        o.notes,
        json_agg(
          json_build_object(
            'productId', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'name', oi.name
          )
        ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = $1
       GROUP BY o.id, o.user_id, o.date, o.status, o.total, o.notes
       ORDER BY o.date DESC`,
      [req.user.id]
    )
    
    console.log('Query result:', result.rows)
    
    res.json({ orders: result.rows })
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ message: 'Error fetching orders' })
  }
})

// Vulnerable endpoint - doesn't properly check if order belongs to user
router.get('/:orderId', authMiddleware, async (req, res) => {
  console.log('Fetching specific order:', req.params.orderId)
  
  try {
    const result = await pool.query(
      `SELECT 
        o.id,
        o.user_id as "userId",
        o.date,
        o.status,
        o.total,
        o.notes,
        json_agg(
          json_build_object(
            'productId', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'name', oi.name
          )
        ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.id = $1
       GROUP BY o.id, o.user_id, o.date, o.status, o.total, o.notes`,
      [req.params.orderId]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' })
    }

    console.log('Found order:', result.rows[0])
    res.json({ order: result.rows[0] })
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({ message: 'Error fetching order' })
  }
})

module.exports = router 