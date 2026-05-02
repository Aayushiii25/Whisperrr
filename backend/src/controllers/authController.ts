//Controller decides:

//What DB query to run
//What data to return
//What error to send

import type { AuthRequest } from "../middleware/auth";
import type { Request, Response } from "express";

import { getAuth, clerkClient } from "@clerk/express";
import { User } from "../models/User";

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function authCallback(req: Request, res: Response) {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      return res.status(400).json({
        message: "Missing userId in request",
      });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(clerkId);

      // extract and validate primary email
      const email = clerkUser.emailAddresses?.[0]?.emailAddress;
      if (!email) {
        return res.status(400).json({
          message: "Email not found",
        });
      }

      const name = clerkUser.firstName
        ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
        : email.split("@")[0];

      user = await User.create({
        clerkId,
        name,
        email,
        avatar: clerkUser.imageUrl ?? undefined,
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("authCallback error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
