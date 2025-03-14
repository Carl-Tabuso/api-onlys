import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../errors/custom-error.js"

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong." });
}

export { errorHandlerMiddleware };