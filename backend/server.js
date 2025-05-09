import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js'; // Still using cartRoutes here, remember to fix if you have orderRoutes
import userRoutes from './routes/user.js';   // Still using cartRoutes here, remember to fix if you have userRoutes
import cors from 'cors'; // Allow requests from frontend

app.use(cors()); // To allow fetching requests
dotenv.config(); // This should load your .env file

// --- Debugging Lines ---
console.log('--- Environment Variables Loaded ---');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Good to check this too
console.log('PORT:', process.env.PORT);             // And this, if you use it for app.listen
console.log('------------------------------------');
// --- End Debugging Lines ---

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", cartRoutes); // Correct this if it should be orderRoutes
app.use("/api/user", cartRoutes);   // Correct this if it should be userRoutes

app.get("/", (req, res) => {
    res.send("Server is ready");
});

const port = process.env.PORT || 5000; // Use environment variable for port if available

app.listen(port, () => {
    connectDB(); // This is where mongoose.connect is called
    console.log(`Server started at http://localhost:${port}`);
});

