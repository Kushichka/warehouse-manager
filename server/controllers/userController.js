import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { User } from "../models/user.js";

export const createUser = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({error: 'Something wrong'});
    }

    const {login, email, password } = req.body;
    
    const candidate = await User.findOne({email: email.toLowerCase()});

    if(candidate) {
        return res.status(400).json({error: `${candidate} is already used`});
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({login, email: email.toLowerCase(), password: hashPassword});

        console.log(user);
        res.status(201).json({message: 'User created successfully'});
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 'Failed to create user'});
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({error: 'Something wrong'});
        }

        const {email, password} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});

        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const isPassEquils = await bcrypt.compare(password, user.password);

        if(!isPassEquils) {
            return res.status(400).json({error: 'Wrong password'});
        }

        console.log(user);
        res.status(200).json(user);

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}