import mongoose from "mongoose";
import 'dotenv/config';

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Server connected to mongoDB!');
    } catch (error) {
        console.log(error);
    }
}

start();