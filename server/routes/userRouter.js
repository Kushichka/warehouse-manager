import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, getUserByEmail, logout, refresh } from '../controllers/userController.js';

const router = new Router();

router.post('/registration',
    check('login', 'Login must be in range from 3 to 24 characters').isLength({min: 3, max: 24}).escape(),
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password must be in range from 6 to 32 characters').isLength({min: 6, max: 32}), 
    createUser
);

router.post('/login', 
    check('email', 'Incorrect email').isEmail(),
    check('password', "Password can't be empty").notEmpty(),
    getUserByEmail
);

router.post('/logout', logout);
router.get('/refresh', refresh);

export default router;