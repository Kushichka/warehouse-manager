import { Router } from 'express';
import { body } from 'express-validator';

import { createUser, getUserByEmail } from '../controllers/userController.js';

const router = new Router();

router.post('/registration',
    body('login').isLength({min: 3, max: 24}),
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}), 
    createUser
);
router.post('/login', 
    body('email').isEmail(),
    body('password').not().isEmpty(),
    getUserByEmail
);

export default router;