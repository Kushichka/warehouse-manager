import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import './db.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
    methods: 'GET,POST',
    credentials: true
}));

app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

