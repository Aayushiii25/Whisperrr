import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getMessages } from "../controllers/messageController";
const router = Router();

// get all messages
router.get("/chat/:chatId", protectRoute, getMessages);

export default router;
