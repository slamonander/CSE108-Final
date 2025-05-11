import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js'; // Still using cartRoutes here, remember to fix if you have orderRoutes
import userRoutes from './routes/user.js';   // Still using cartRoutes here, remember to fix if you have userRoutes
import cors from 'cors'; // Allow requests from frontend
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config(); // This should load your .env file

// --- Debugging Lines ---
console.log('--- Environment Variables Loaded ---');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Good to check this too
console.log('PORT:', process.env.PORT);             // And this, if you use it for app.listen
console.log('------------------------------------');
// --- End Debugging Lines ---


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://dabloons-market.vercel.app',
  /^https:\/\/.*\.vercel\.app$/, // Regex to allow all vercel preview deployments
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow non-browser requests

    const isAllowed = allowedOrigins.some((allowedOrigin) => {
      if (typeof allowedOrigin === 'string') return allowedOrigin === origin;
      if (allowedOrigin instanceof RegExp) return allowedOrigin.test(origin);
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS rejected origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.options('*', cors()); // Handle preflight requests

   // To allow fetching requests
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/orders", orderRoutes); // Correct this if it should be orderRoutes
app.use("/api/user", userRoutes);   // Correct this if it should be userRoutes

// Serve front
app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

app.get("/", (req, res) => {
    res.send("Server is ready");
});

const port = process.env.PORT; // Use environment variable for port if available

app.listen(port, () => {
    connectDB(); // This is where mongoose.connect is called
    //console.log(`Server started at http://localhost:${port}`);
});
