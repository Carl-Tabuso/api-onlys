const errorHandlerMiddleware = async (err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ msg: "Something went wrong." });
}

export default errorHandlerMiddleware;