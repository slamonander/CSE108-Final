import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.js'
// import Product from './models/product.js'
// import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(express.json());  

app.use("/api/products", productRoutes);

app.get("/", (req, res)=>{
    res.send("Server is ready");
});



//console.log(process.env.MONGO_URI);

app.listen(5000, () =>{
    connectDB();
    console.log("Server started at http://localhost:5000")
});
