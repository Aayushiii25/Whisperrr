//“How a chat/message should look in the database”
//we need to store msg permanently

import mongoose, { Schema, type Document } from "mongoose";
export interface Ichat extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage: Date;
  createdAt: Date;
  updatedAt: Date;
}
const ChatSchema = new Schema<IChat>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // when last msg was sent used for sorting
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }, //automatically adds createdAt,updatedAt
);

export const Chat = mongoose.model("Chat", ChatSchema);

//creating chatbox blueprint
