// Fetch all users
// Used for starting new chats
import { useAuth } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../lib/axios";

function useUserSync() {
  const { isSignedIn, getToken } = useAuth();

  const {
    mutate: syncUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      const res = await api.post(
        "/auth/callback",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (isSignedIn && !isPending && !isSuccess) {
      syncUser();
    }
  }, [isSignedIn, syncUser, isPending, isSuccess]);

  return { isSynced: isSuccess, isSyncing: isPending };
}
export default useUserSync;

// useUserSync = sync logged-in Clerk user with our database
// Runs after login
// If user doesn't exist → create user
// If user exists → update user info
// Returns syncing/synced state
