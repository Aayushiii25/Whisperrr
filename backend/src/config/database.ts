import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("mongodb connected ");
  } catch (error) {
    console.error("mongodb connection error", error);
    process.exit(1); // exit with failure 0 mean success 1 mean failure
  }
};
