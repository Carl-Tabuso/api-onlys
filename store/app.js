import express, { json, urlencoded } from "express";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import "express-async-errors";
import connectDb from "./config/db-conn.js";
import { storeRouter } from "./routes/store.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import notFound from "./middlewares/error-handler.js";

dotenvExpand.expand(dotenv.config());

const port = process.env.PORT;
const conn = process.env.MONGO_URI;
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }))
app.use("/api/v1/store", storeRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

const run = async () => {
    try {
        await connectDb(conn);
        app.listen(port, (err) => console.log(`Server listening to port ${port}`));
    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);