import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
export async function getUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const UserId = req.userId;
    // we dont want to see our own user in the list of users
    const users = await User.find({ _id: { $ne: UserId } })
      .select("name email avatar")
      .limit(100);
    res.json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
}
