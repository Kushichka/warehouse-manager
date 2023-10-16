import { User } from "../models/user.js";

export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        console.log(user);
        res.status(201).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({email});

        if(!user) {
            res.status(404).json({ error: 'User not found' });
            console.log('User not found');
        } else {
            res.status(200).json(user);
            console.log(user);
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}