import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import { User } from "../models/user.js";

export const createUser = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json(errors.errors[0].msg);
    }

    const {login, email, password } = req.body;
    
    const candidate = await User.findOne({email: email.toLowerCase()});
    if(candidate) {
        return res.status(400).json(`${candidate.email} is already used`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    try {
        const user = await User.create({login, email: email.toLowerCase(), password: hashPassword});

        console.log(user);
        res.status(201).json('User created successfully');
    } catch(error) {
        console.log(error);
        res.status(500).json('Failed to create user');
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json(errors.errors[0].msg);
        }

        const {email, password} = req.body;

        const user = await User.findOne({email: email.toLowerCase()});
        if(!user) {
            return res.status(404).json('User not found');
        }

        const isPassEquils = await bcrypt.compare(password, user.password);
        if(!isPassEquils) {
            return res.status(400).json('Wrong password');
        }

        const payload = {
            email: user.email,
            id: user._id
        };

        const token = jwt.sign(payload, process.env.PRIVATE_KEY);
        console.log(user);
        res.status(200).json({user, token});

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}