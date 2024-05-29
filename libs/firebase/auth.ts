import {
  type User,
  signInWithEmailAndPassword,
  signOut as _signOut,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/libs/firebase/firebase-config";
import { createSession, removeSession } from "@/actions/cookie-actions";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signIn(email: string, password: string) {
  // const router = useRouter();
  // email, password 유효성 체크 필요
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = credential;
    const token = await user.getIdToken();
    const result = await createSession(token);
    return result;
  } catch (error) {
    // error 처리
    console.error("Error signing in", error);
  }
}

export async function signOut() {
  try {
    await _signOut(auth);
    await removeSession();
  } catch (error) {
    console.error("Error signing out", error);
  }
}
