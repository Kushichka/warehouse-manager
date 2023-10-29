import tokenService from "../services/tokenService.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next('error authorizationHeader');
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return next('error token');
        }

        const data = tokenService.validateAccessToken(token);
        if(!data) {
            return next('error data');
        }

        req.user = data;
        next();
    } catch (error) {
        next('error middleware');
    }
}