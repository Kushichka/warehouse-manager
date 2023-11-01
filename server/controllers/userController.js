import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import { User } from "../models/user.js";
import tokenService from '../services/tokenService.js';

export const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.errors[0].msg);
    }

    const { login, email, password } = req.body;

    const findEmail = await User.findOne({ email: { $regex: email, $options: 'i' } });
    if (findEmail) {
        return res.status(400).json(`${findEmail.email} is already used`);
    }

    const findLogin = await User.findOne({ login: { $regex: login, $options: 'i' } });
    if (findLogin) {
        return res.status(400).json(`${findLogin.login} is already used`);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({ login, email: email, password: hashPassword });

        return res.status(201).json('User created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).json('Failed to create user');
    }
}

export const getUserByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.errors[0].msg);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: { $regex: email, $options: 'i' } });
    if (!user) {
        return res.status(404).json('User not found');
    }

    const isPassEquils = await bcrypt.compare(password, user.password);
    if (!isPassEquils) {
        return res.status(400).json('Wrong password');
    }

    const data = {
        login: user.login,
        email: user.email,
        id: user._id
    };

    const tokens = tokenService.createTokens(data);
    try {
        await tokenService.saveToken(data.id, tokens.refreshToken);
    } catch (error) {
        return res.status(500).json('Server error')
    }
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); //30 days

    return res.status(200).json({ user, ...tokens });
}

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const token = await tokenService.removeToken(refreshToken);
        res.clearCookie('refreshToken');

        return res.json(token);
    } catch (error) {
        console.log(error);
    }
}

export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json('You need to log in');
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            return res.status(401).json('You need to log in');
        }

        const user = await User.findById(userData.id);

        const data = {
            login: user.login,
            email: user.email,
            id: user._id
        };

        const tokens = tokenService.createTokens(data);
        await tokenService.saveToken(data.id, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); //30 days

        return res.status(200).json({ userData, ...tokens });

    } catch (error) {
        console.log(error);
    }
}