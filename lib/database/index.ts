import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: "null", promise: "null" };

// serveless databse cache connection, instead of requesting the db everytime over internet, we are caching it

export const connectToDb = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONOGDB_URI is missing!");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "bookevent",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
