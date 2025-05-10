// backend/controllers/userController.js
import User from '../models/user.js'; // Correct path to your user model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // To access JWT_SECRET from .env

const JWT_SECRET = process.env.JWT_SECRET || 'yourFallbackSecretKey'; // IMPORTANT: Set this in your .env file!

// --- REGISTER (SIGN UP) USER ---
export const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        // 2. Create new user instance
        user = new User({
            name,
            username,
            email,
            password, // Plain password for now, will be hashed
            // balance will use default from schema
        });

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Save user to DB
        await user.save();

        // 5. Generate JWT (optional: auto-login after registration)
        const payload = {
            user: {
                id: user.id, // or user._id from MongoDB
            },
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '5h' }, // Token expiration
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token, message: 'User registered successfully' });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error during registration');
    }
};

// --- LOGIN USER ---
export const loginUser = async (req, res) => {
    const { email, password } = req.body; // Or login with username

    try {
        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials (email not found)' });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: `Invalid credentials` });
        }

        // 3. User matched, create JWT
        const payload = {
            user: {
                id: user.id,
            },
        };
        //console.log("JWT_SECRET used for signing:", JWT_SECRET);
        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: { // Send some user info back if needed
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        balance: user.balance
                    },
                    message: 'Login successful'
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error during login');
    }
};

// --- AUTHENTICATE USER ---
export const auth = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Request needs a token!' });
    }
    const token = authHeader.split(' ')[1];
    try {
        //console.log("JWT_SECRET used for verifying:", JWT_SECRET);
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Attach user info to request
        console.log("Authenticated User");
        next(); // Proceed to the route handler
    } catch (err) {
        res.status(401).json({ message: `Token is not valid: ` + err.message });
    }
  }