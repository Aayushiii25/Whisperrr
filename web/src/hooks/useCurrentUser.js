// Fetch logged-in user info
// Used to identify "me"
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";

export const useCurrentUser = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
  });
};

// useCurrentUser = fetch logged-in user's profile
// Used to know:
//  who am I
//  my user id
// my name/avatar/email
//  helps identify my messages vs others
