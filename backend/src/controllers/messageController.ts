import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Message } from "../models/Message";
import { Chat } from "../models/Chat";
export async function getMessages(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { chatId } = req.params;

    const chat = await Chat.findOne({ _id: chatId, participants: userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const messages = await Message.find({ chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 }); // sort messages by creation time in ascending order
    res.json(messages);
  } catch (error) {
    res.status(500);
    next(error);
  }
}
