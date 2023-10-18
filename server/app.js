import express from 'express';
import cors from 'cors';

import routes from './routes/routes.js';
import './db.js';

const port = process.env.PORT || 5000;
const server = express();

server.use(cors());
server.use(express.json());

server.use('/api', routes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

