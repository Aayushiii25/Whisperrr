import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("mongodb connected ");
  } catch (error) {
    console.error("mongodb connection error", error);
    process.exit(1); // exit with failure 0 mean success 1 mean failure
  }
};
