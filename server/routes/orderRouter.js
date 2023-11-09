import { Router } from "express";
import { check } from "express-validator";

import { createOrder } from "../controllers/orderController.js";

const router = new Router();

router.post('/create', 
    check('email', 'Incorrect email').isEmail(),
    check('amount', 'Incorrect amount').notEmpty().isInt({min: 0, max: 5}),
    createOrder
);

export default router;