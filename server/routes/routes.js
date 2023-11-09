import { Router } from 'express';

import userRouter from './userRouter.js';
import goodsRouter from './goodsRouter.js';
import orderRouter from './orderRouter.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = new Router();

router.use('/users', userRouter);

router.get('/admin', authMiddleware, (req, res) => { // for test
    res.json(req.user);
});

router.use('/goods', authMiddleware, goodsRouter); // need adminMiddleware
router.use('/order', authMiddleware, orderRouter); // need adminMiddleware

export default router;