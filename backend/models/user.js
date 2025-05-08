import mongoose from 'mongoose';
import validator from 'validator';
//const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "Please enter a valid email."],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }

    },
    password:{
        type: String,
        required: [true, "Please enter a valid password."],
        minLength: [6, "Password must be at least 6 characters."]
    },
    registrationInfo:{
        type: Date,
        default: Date.now,
    },
    balance:{
        type: Number,
        required: true,
        min: 0,
        default: 1000,
    }
    
});

const User = mongoose.model('User', userSchema);

export default User;