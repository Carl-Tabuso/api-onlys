import mongoose from "mongoose";

const connectDb = (conn) => mongoose.connect(conn, { dbName: "storeapis"});

export default connectDb;