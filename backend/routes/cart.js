import express from 'express';
import Cart from '../models/cart.js';
import {auth} from '../controllers/userController.js'
import User from '../models/user.js';

const router = express.Router();

//get the cart by username
router.get('/:userId', auth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


//add an item to the cart
router.post('/:userId/items', auth, async (req, res) => {
  const userId = req.params.userId;
  const { productId, name, quantity, price } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, name, quantity, price }],
        total: quantity * price,
      });
    } else {
      let index = cart.items.findIndex(item => item.productId === productId);
      if (index >= 0) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//update item quantity in cart
router.put('/:userId/items/:productId', auth, async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.productId === req.params.productId);
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete item in the cart (by filtering out item)
router.delete('/:userId/items/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:userId/purchase', auth, async (req, res) => {
  const userId = req.params.userId;
  try {
    //Find the cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }

    //Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    //Check if user has enough balance
    if (user.balance < cart.total) {
      return res.status(400).json({ message: 'Insufficient balance.' });
    }

    //Deduct balance
    user.balance -= cart.total;
    await user.save();

    //Clear cart
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json({
      message: 'Purchase successful!',
      balance: user.balance
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




export default router;