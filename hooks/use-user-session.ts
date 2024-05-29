import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@/libs/firebase/auth";

export type SessionState = string | null;

export default function useUserSession(initSession: SessionState) {
  const [userUid, setUserUid] = useState<string | null>(initSession);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return userUid;
}
