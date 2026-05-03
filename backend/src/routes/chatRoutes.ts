import { Router } from "express";
import {
  createChat,
  getUserChats,
  getChatMessages,
  sendMessage,
} from "../controllers/chatController";

const router = Router();

// create a new chat
router.post("/", createChat);

// get all chats for a user
router.get("/", getUserChats);

// get messages of a specific chat
router.get("/:chatId/messages", getChatMessages);

// send message in a chat
router.post("/:chatId/message", sendMessage);

export default router;
