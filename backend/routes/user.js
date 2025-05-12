// backend/routes/user.js
import express from 'express';
import { registerUser, loginUser, getDabloonsBalance } from '../controllers/userController.js'; // Ensure getDabloonsBalance is imported

const router = express.Router();

// @route   POST api/user/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/user/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET api/user/dabloons/balance
// @desc    Get user's dabloons balance
// @access  Private (requires authentication)
router.get('/dabloons/balance', auth, getDabloonsBalance);  // Make sure this route exists

export default router;
