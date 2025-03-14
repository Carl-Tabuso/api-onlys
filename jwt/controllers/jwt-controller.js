import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors/bad-request.js";
import path from "path";
import rootPath from "../../base-path.js";
import jwt from "jsonwebtoken";

const index = async (req, res, next) => {
    return res.status(StatusCodes.OK).sendFile(path.join(rootPath, "jwt", "public", "index.html"));
}

const dashboard = async (req, res, next) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    return res.status(StatusCodes.OK).json({
        message: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

const login = async (req, res, next) => {
    const { username, password } = req.body;
    if (! username || ! password) {
        throw new BadRequest("Complete the credentials, asshole!");
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_TOKEN_SECRET, { expiresIn: "30d" });
    return res.status(StatusCodes.CREATED).json({
        message: "User created.",
        token,
    });
}

export const jwtController = { index, dashboard, login };