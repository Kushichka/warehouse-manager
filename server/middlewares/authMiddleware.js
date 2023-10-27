import { validateToken } from "../services/token.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next('error authorizationHeader!');
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return next('error token!');
        }

        const data = validateToken(token);
        if(!data) {
            return next('error data!');
        }

        res.json({message: 'OK!'});
        next();
    } catch (error) {
        next('error middleware!');
    }
}