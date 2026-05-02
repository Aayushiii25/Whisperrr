import { Router } from "express";
import { getMe } from "../controllers/authController";
import { protectRoute } from "../middleware/auth";
import { authCallback } from "../controllers/authController";
const router = Router();

//user send request on /api/auth/me to get their own details, this route is protected and requires authentication
router.get("/me", protectRoute, getMe);
router.post("callback", authCallback);
export default router;
