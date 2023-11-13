import { Router } from "express";
import { check } from "express-validator";

import { createOrder, changeOrderStatus } from "../controllers/orderController.js";

const router = new Router();

router.post('/create', 
    check('email', 'Incorrect email').isEmail(),
    check('amount', 'Incorrect amount').notEmpty().isNumeric({min: 0, max: 5}),
    createOrder
);

router.post('/status', 
    check('email', 'Incorrect email').isEmail(),
    check('id', 'Incorrect id').notEmpty(),
    check('status', 'Incorrect status').notEmpty().isIn(['free', 'active', 'done', 'fail']),
    changeOrderStatus
);

export default router;