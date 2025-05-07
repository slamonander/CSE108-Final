import mongoose from 'mongoose';

const orderSchema =  new mongoose.Schema({
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
            //price at the time of purchase
            type: Number,
            required: true,
        }
    }],
    total:{
        type: Number,
        required: true,
    },
    dateCreated:{
        type: Date,
        default: Date.now,
    },
    orderStatus:{
        type: String,
        emum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Pending',
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;