import jwt from 'jsonwebtoken';

export const validateToken = (token) => {
    try {
        const data = jwt.verify(token, process.env.PRIVATE_KEY);
        return data;
    } catch (error) {
        return null;
    }
}