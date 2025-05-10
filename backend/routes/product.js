import express from 'express';
import Product from '../models/product.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Unable to find product."});
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Unable to find product"});
        }
        res.status(200).json({ success: true, data: product});
    } catch (error) {
        console.log("Unable to fetch product:", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
});

router.get("/", async (req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.log("Cannot get products:", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
})

router.get("/filter", async(req, res) =>{
    const {category, min, max} = req.body;
    let filter = {};
    if(min || max){
        filter.price = {};
        if (max){
            filter.price.$lte = parseFloat(max);
        }
        if(min){
            filter.price.$gte = parseFloat(min);
        }
    }
    if(category){
        filter.category = category;
    }
    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
})

router.post("/", async (req, res)=>{
    const product = req.body;
    if(!product.name|| !product.price || !product.image || !product.description || !product.quantity){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("New product will not post:", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
});

router.delete("/:id", async (req, res) => {
    const{id} = req.params
    

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error) {
        console.log("Error when deleting product:", error.message);
        res.status(404).json({success:false, message: "Product not found"})
    }
});

router.put("/:id", async (req, res) =>{
    const{id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({success:false, message:"Product not found"})

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success:false, message: "Server Error"})
    }
})

export default router;