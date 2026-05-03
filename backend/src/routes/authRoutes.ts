import { Router } from "express";
import { getMe, authCallback } from "../controllers/authController";

import { protectRoute } from "../middleware/auth";

const router = Router();

// current logged-in user
router.get("/me", protectRoute, getMe);

// Clerk callback
router.post("/callback", authCallback);

export default router;
