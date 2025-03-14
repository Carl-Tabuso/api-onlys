import fakes from "../mocks.json" with {type: "json"};
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import connectDb from "../config/db-conn.js";
import Product from "../models/product.js";

dotenvExpand.expand(dotenv.config());

try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(fakes, {
        new: true,
        runValidators: true,
    });
    process.exit(0);
} catch (err) {
    console.error(err);
    process.exit(1);
}