import { StatusCodes } from "http-status-codes";

const notFound = (req, res, next) =>  {
    return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found." });
}

export { notFound };