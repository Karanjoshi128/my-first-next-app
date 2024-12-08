import mongoose from "mongoose";
import "dotenv/config";

let isConnected = false;

export async function connect() {
  if (isConnected) return;

  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (error : any)  {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("MongoDB connection failed");
  }
}

