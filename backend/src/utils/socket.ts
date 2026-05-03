import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { verifyToken } from "@clerk/express";

import { Message } from "../models/Message";
import { Chat } from "../models/Chat";
import { User } from "../models/User";

// userId -> socketId
export const onlineUsers: Map<string, string> = new Map();

export const initializeSocket = (httpServer: HttpServer) => {
  const allowedOrigins = [
    "http://localhost:8081",
    "http://localhost:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];

  const io = new SocketServer(httpServer, {
    cors: {
      origin: allowedOrigins,
    },
  });

  // authentication middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token as string;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const session = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
      });

      const clerkId = session.sub;

      const user = await User.findOne({ clerkId });

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.data.userId = user._id.toString();

      next();
    } catch (error: any) {
      next(new Error(error.message || "Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId as string;

    // send current online users
    socket.emit("online-users", {
      userIds: Array.from(onlineUsers.keys()),
    });

    // mark user online
    onlineUsers.set(userId, socket.id);

    // notify others
    socket.broadcast.emit("user-online", {
      userId,
    });

    // personal room
    socket.join(`user:${userId}`);

    // join chat room
    socket.on("join-chat", (chatId: string) => {
      socket.join(`chat:${chatId}`);
    });

    // leave chat room
    socket.on("leave-chat", (chatId: string) => {
      socket.leave(`chat:${chatId}`);
    });

    // send message
    socket.on(
      "send-message",
      async (data: { chatId: string; text: string }) => {
        try {
          const { chatId, text } = data;

          const chat = await Chat.findOne({
            _id: chatId,
            participants: userId,
          });

          if (!chat) {
            socket.emit("socket-error", {
              message: "Chat not found",
            });
            return;
          }

          const message = await Message.create({
            chat: chatId,
            sender: userId,
            text,
          });

          chat.lastMessage = message._id as any;
          chat.lastMessageAt = new Date();

          await chat.save();

          await message.populate("sender", "name avatar");

          // live chat screen
          io.to(`chat:${chatId}`).emit("new-message", message);

          // chat list updates
          for (const participantId of chat.participants as any[]) {
            io.to(`user:${participantId.toString()}`).emit(
              "new-message",
              message,
            );
          }
        } catch (error) {
          socket.emit("socket-error", {
            message: "Failed to send message",
          });
        }
      },
    );

    // typing
    socket.on("typing", async (data: { chatId: string; isTyping: boolean }) => {
      const typingPayload = {
        userId,
        chatId: data.chatId,
        isTyping: data.isTyping,
      };

      // inside chat screen
      socket.to(`chat:${data.chatId}`).emit("typing", typingPayload);

      // chat list
      try {
        const chat = await Chat.findById(data.chatId);

        if (chat) {
          const otherParticipantId = (chat.participants as any[]).find(
            (p) => p.toString() !== userId,
          );

          if (otherParticipantId) {
            socket
              .to(`user:${otherParticipantId.toString()}`)
              .emit("typing", typingPayload);
          }
        }
      } catch {
        // typing isn't critical
      }
    });

    // disconnect
    socket.on("disconnect", () => {
      onlineUsers.delete(userId);

      socket.broadcast.emit("user-offline", {
        userId,
      });
    });
  });

  return io;
};

// ======================================
// TODO: Future chat features
// ======================================
//
// 1. Read receipts
//    - sent
//    - delivered
//    - seen
//
// 2. Unread message count
//    - badge count for each chat
//
// 3. Last seen status
//    - online / offline
//    - last active timestamp
//
// 4. Message reactions
//    - ❤️ 😂 🔥 👍
//
// 5. Reply to message
//    - quote previous message
//
// 6. Edit messages
//    - show "(edited)"
//
// 7. Delete messages
//    - delete for me
//    - delete for everyone
//
// 8. Media sharing
//    - images
//    - videos
//    - documents
//    - voice notes
//
// 9. Push notifications
//    - notify when app is closed
//
// 10. Block / mute users
//
// 11. Group chats
//
// 12. Presence indicators
//    - typing...
//    - recording...
//    - uploading...
//
// 13. Message search
//
// 14. Pinned chats / starred messages
//
// ======================================
