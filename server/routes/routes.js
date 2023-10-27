import { Router } from 'express';

import userRouter from './userRouter.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = new Router();

router.use('/users', userRouter);

router.get('/admin', authMiddleware, (req, res) => { // for test
    res.json('hello world');
});

export default router;