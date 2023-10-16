import express from 'express';

import { createUser, getUserByEmail } from '../controllers/userController.js';

const router = express.Router();

router.post('/registration', createUser);
router.get('/', getUserByEmail);

export default router;