import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.js'
import cartRoutes from './routes/cart.js'
import orderRoutes from './routes/order.js'
import userRoutes from './routes/user.js'


dotenv.config();

const app = express();

app.use(express.json());  

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", cartRoutes);

app.use("/api/user", cartRoutes);

app.get("/", (req, res)=>{
    res.send("Server is ready");
});



//console.log(process.env.MONGO_URI);

app.listen(5000, () =>{
    connectDB();
    console.log("Server started at http://localhost:5000")
});
