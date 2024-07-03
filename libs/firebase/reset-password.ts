import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/libs/firebase/firebase-config";

export default async function requestResetPassWord(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    return false;
  }
}
