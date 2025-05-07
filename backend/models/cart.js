import mongoose from 'mongoose';

const cartSchema =  new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    items:[{
        productId:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        price:{
            //price at the time of adding to cart
            type: Number,
            required: true
        },
    }],
    total:{
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;