import { Router } from "express";
import { check } from "express-validator";

import { createGoods } from "../controllers/goodsController.js";

const router = new Router();

router.post('/create',
    check('name', 'Incorrect name').notEmpty().isString().escape(),
    check('palletizing', 'Incorrect palletizing').notEmpty().isInt({ min: 0 }),
    check('price', 'Incorrect price').notEmpty().isInt({ min: 0 }),
    createGoods
);

export default router;