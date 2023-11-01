import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import routes from './routes/routes.js';
import './db.js';

const port = process.env.PORT || 5000;
const server = express();

server.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
server.use(express.json());
server.use(cookieParser());

server.use('/api', routes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

