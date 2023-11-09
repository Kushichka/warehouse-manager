import mongoose from "mongoose";

import { orderSchema } from "./orderSchema.js";

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    },
    money: Number,
    orders: [{
        type: orderSchema,
        default: {}
    }],
    employees: {
        employees: [{
            name: String // is required?
        }],
        max: Number
    },
    warehouse: {  
        place: {
            used: Number,
            max: Number
        }
    }
});

export const User = mongoose.model('User', userSchema);