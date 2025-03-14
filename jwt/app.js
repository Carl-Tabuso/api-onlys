import express, { json, urlencoded } from "express";
import "express-async-errors";
import "dotenv/config";
import { errorHandlerMiddleware } from "./middlewares/error-handler.js";
import { notFound } from "./middlewares/not-found.js";
import { jwtRouter } from "./routes/jwt-router.js";
import path from "path";
import rootPath from "../base-path.js";

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(rootPath, "jwt", "public")));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/v1/jwt", jwtRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

app.listen(port, (err) => console.log(`Server listening to port ${port}...`));