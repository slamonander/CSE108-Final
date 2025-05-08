import express from 'express';
import Cart from '../models/cart.js';

const router = express.Router();

//get the cart by username
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

//add an item to the cart
router.post('/:username/items', async (req, res) => {
const {productId, name, quantity, price} = req.body;
try {
    let cart = await Cart.findOne({username});
    if(!cart){
    //create a cart if one doesn't exist
    cart = new Cart({
        username: req.params.username,
        items: [{productId, name, quantity, price}],
        total: quantity * price,
    });
    }
    else{
    //if item in cart update quantity: if not push item to array
    index = cart.items.findIndex(item => item.productId === productId);
    if(index >= 0){
        cart.items[index].quantity += quantity;
    }
    else{
        cart.items.push({productId, name, quantity, price});
    }
    //reduce goes through each element of array and sums into accumulator which starts at 0
    cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }
    await cart.save();
    res.status(201).json(cart);
} catch (err) {
    res.status(500).json({ error: 'Server error' });
}
});

//update item quantity in cart
router.put('/:username/items/:productId', async (req, res) => {
    const { quantity } = req.body;
    try {
      const cart = await Cart.findOne({ username: req.params.username });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      const item = cart.items.find(item => item.productId === req.params.productId);
      if (!item) return res.status(404).json({ message: 'Item not found in cart' });
  
      item.quantity = quantity;
      cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
      await cart.save();
      res.status(204).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

//delete item in the cart (by filtering out item)
router.delete('/:username/items/:productId', async (req, res) => {
    try {
      const cart = await Cart.findOne({ username: req.params.username });
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      cart.items = cart.items.filter(item => item.productId !== req.params.productId);
      cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});



export default router;