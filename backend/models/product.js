import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
    },
    quantity:{
        type: Number,
        required: true
    },
    ratingTotal: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
    
}, {
    //adds createdAt and updatedAt for the document
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;