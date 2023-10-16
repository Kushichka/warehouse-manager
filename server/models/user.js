import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

export const User = mongoose.model('User', userSchema);