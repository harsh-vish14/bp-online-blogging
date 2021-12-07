import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log(
      `Database Connected (${conn.connection.name}): ${conn.connection.host}`
    );
    return conn.connection.db;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw new Error("Database not Connected");
  }
};
