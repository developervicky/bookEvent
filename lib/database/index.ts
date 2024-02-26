import mongoose from "mongoose";

const MONOGDB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: "null", promise: "null" };

// serveless databse cache connection, instead of requesting the db everytime over internet, we are caching it

export const connectToDb = async () => {
  if (cached.conn) return cached.conn;

  if (!MONOGDB_URI) throw new Error("MONOGDB_URI is missing!");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONOGDB_URI, {
      dbName: "bookEvent",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
