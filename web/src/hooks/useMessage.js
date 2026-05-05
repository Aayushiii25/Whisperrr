// Fetch messages of selected chat
// Listen for new messages via socket
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/axios";

export const useMessages = (chatId) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const token = await getToken();
      const res = await api.get(`/messages/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!chatId,
  });
};

// useMessages = fetch messages of selected chat
// Input: chatId
// Returns:
// all messages of that conversation
// Only runs when a chat is selected
