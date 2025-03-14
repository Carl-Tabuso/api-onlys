import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticated.js";

const authMiddleware = async (req, res, next) => {
    const { authorization: authHeader } = req.headers;

    if (! authHeader || ! authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError("No token provided");
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (err) {
        console.error(err);
        throw new UnauthenticatedError("Not authorized to access this route.");
    }
}

export { authMiddleware };