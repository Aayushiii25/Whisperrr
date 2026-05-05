// Sync user online/offline status with server
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/axios";

export const useUsers = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const token = await getToken();
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });
};
// useUsers = fetch all users from backend
// Used in:
//  NewChatModal
//  search users by name/email
// Lets user start new conversations
