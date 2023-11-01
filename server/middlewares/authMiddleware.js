import tokenService from "../services/tokenService.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(res.status(401));
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            return next(res.status(401));
        }

        const data = tokenService.validateAccessToken(token);
        if(!data) {
            return next(res.status(401));
        }

        req.user = data;
        next();
    } catch (error) {
        next(res.status(401));
    }
}