import jwt from 'jsonwebtoken';

import { Token } from '../models/token.js';

class TokenService {
    createTokens = (payload) => {
        const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: 60}); //60 seconds
        const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {expiresIn: '30d'}); //30 days
    
        return {
            accessToken,
            refreshToken
        }
    };

    saveToken = async (userId, refreshToken) => {
        const tokenData = await Token.findOne({user: userId});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
    
        const token = await Token.create({user: userId, refreshToken});
        return token;
    };

    removeToken = async (refreshToken) => {
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData;
    };

    validateAccessToken = (accessToken) => {
        try {
            const data = jwt.verify(accessToken, process.env.PRIVATE_KEY);
            return data;
            
        } catch (error) {
            return null;
        }    
    };

    validateRefreshToken = (refreshToken) => {
        try {
            const data = jwt.verify(refreshToken, process.env.REFRESH_KEY);
            return data;
            
        } catch (error) {
            return null;
        }    
    };

    findToken = async (refreshToken) => {
        const tokenData = await Token.findOne({refreshToken});
        return tokenData;
    }
}

export default new TokenService();

// export const createTokens = (payload) => {
//     const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {expiresIn: '24h'});
//     const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, {expiresIn: '30d'});

//     return {
//         accessToken,
//         refreshToken
//     }
// }

// export const saveToken = async (userId, refreshToken) => {
//     const tokenData = await Token.findOne({user: userId});
//     if(tokenData) {
//         tokenData.refreshToken = refreshToken;
//         return tokenData.save();
//     }

//     const token = await Token.create({user: userId, refreshToken});
//     return token;
// }

// export const removeToken = async (refreshToken) => {
//     const tokenData = await Token.deleteOne({refreshToken});
//     return tokenData;
// }

// export const validateRefreshToken = (refreshToken) => {
//     try {
//         const data = jwt.verify(refreshToken, process.env.REFRESH_KEY);
//         return data;
        
//     } catch (error) {
//         return null;
//     }    
// }