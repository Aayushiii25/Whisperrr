import mongoose, { Schema, type Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  name: String;
  email: String;
  avatar: String;
  createdAt: Date;
  updatedAt: Date;
}
export const UserSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
export const User = mongoose.models.User || mongoose.model("User", UserSchema);

//where and how i store my user's data
