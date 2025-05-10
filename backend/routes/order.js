import express from 'express';
import Order from '../models/order.js';
import User from '../models/user.js';
import Product from '../models/user.js';
import mongoose from 'mongoose';
import {auth} from '../controllers/userController.js'

const router = express.Router();

//Place an order
router.post('/', auth, async (req, res) => {
    try {
        const { username, items, total, address } = req.body;
    
        // check if the user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        // Check if user has enough balance
        if (user.balance < total) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
    
        // Deduct balance
        user.balance -= total;
        await user.save();

        //Removes quantity from items
        for (const item of items) {
            const product = await Product.findById(new mongoose.Types.ObjectId(item.productId));
            if (!product) {
                return res.status(404).json({ message: `Product ${item.name} not found` });
            }
            
            if (product.quantity < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
            }
        
            product.quantity -= item.quantity;
            await product.save();
        }
  
        // Create new order
        const newOrder = new Order({
            username,
            items,
            total,
            address,
            orderStatus: 'Pending'
        });
        await newOrder.save();
    
        // Clear the user's cart
        await Cart.findOneAndUpdate({ username }, { items: [], total: 0 });
    
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
  
//Get all orders for a user
router.get('/:username', auth, async (req, res) => {
    try {
        
        const orders = await Order.find({ username: req.params.username }).sort({ dateCreated: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
  
//Get order by ID
router.get('/order/:id', auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//Update order status
router.put('/order/:id/status', auth, async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'];
        if (!validStatuses.includes(orderStatus)) {
        return res.status(400).json({ message: 'Invalid order status' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.orderStatus = orderStatus;
        await order.save();

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;