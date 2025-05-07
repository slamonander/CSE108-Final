import express from 'express';
import Cart from '../models/cart.js';

const router = express.Router();

router.get('/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
      const cart = await Cart.findOne({ username });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });


export default router;