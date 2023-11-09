import { Schema, model } from "mongoose";

const goodsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    palletizing: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export const Goods = model('Goods', goodsSchema);