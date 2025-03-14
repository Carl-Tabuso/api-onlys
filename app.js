import express, { json, urlencoded } from "express";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import "express-async-errors";
import connectDb from "./store/config/db-conn.js";
import { storeRouter } from "./store/routes/store.js";
import routePrefix from "./route-prefix.js";
import errorHandlerMiddleware from "./store/middlewares/error-handler.js";
import notFound from "./store/middlewares/not-found.js";

dotenvExpand.expand(dotenv.config());

const port = process.env.PORT;
const conn = process.env.MONGO_URI;
const app = express();

// app.use(json());
app.use(urlencoded({ extended: true }));
app.use(routePrefix.store, storeRouter);
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