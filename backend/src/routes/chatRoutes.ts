import { Router } from "express";
import { protectRoute } from "../middleware/auth";

const router = Router();

router.use(protectRoute);
// get all chats for a user
router.get("/", getChats);
router.post("/with/:participantId", getOrCreateChat);

export default router;
