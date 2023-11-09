import { Schema } from "mongoose";

export const orderSchema = new Schema({
    goods: {
        type: Schema.Types.ObjectId,
        ref: 'Goods',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    status: {
        type: ['free', 'active', 'done', 'fail'],
        default: 'free'
    }
});