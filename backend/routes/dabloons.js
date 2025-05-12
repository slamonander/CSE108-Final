import express from 'express';
import Dabloons from '../models/dabloons.js';
import User from '../models/user.js';
import { auth } from '../controllers/userController.js';

const router = express.Router();

// Get dabloons balance for a user
router.get('/:userId/balance', auth, async (req, res) => {
  try {
    const dabloons = await Dabloons.findOne({ userId: req.params.userId });

    if (!dabloons) {
      return res.status(404).json({ message: 'Dabloons account not found' });
    }

    res.json({ balance: dabloons.balance });
  } catch (error) {
    console.error('Get Balance Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Initialize dabloons for a user (if not yet created)
router.post('/init/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let dabloons = await Dabloons.findOne({ userId: user._id });
    if (dabloons) return res.status(400).json({ message: 'Dabloons already initialized' });

    dabloons = new Dabloons({
      userId: user._id,
      balance: 1000 // default starting balance
    });

    await dabloons.save();
    res.status(201).json({ message: 'Dabloons initialized', balance: dabloons.balance });
  } catch (error) {
    console.error('Init Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Modify dabloons balance (add or subtract)
router.put('/:userId/balance', auth, async (req, res) => {
  try {
    const { amount } = req.body; // positive to add, negative to deduct

    const dabloons = await Dabloons.findOne({ userId: req.params.userId });
    if (!dabloons) return res.status(404).json({ message: 'Dabloons not found' });

    if (dabloons.balance + amount < 0) {
      return res.status(400).json({ message: 'Insufficient dabloons' });
    }

    dabloons.balance += amount;
    await dabloons.save();

    res.json({ message: 'Balance updated', balance: dabloons.balance });
  } catch (error) {
    console.error('Balance Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;