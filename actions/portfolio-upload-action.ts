import { db } from "@/libs/firebase/firebase-config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

// Get List
export async function getPortfolioList(id: string) {
  try {
    // pagination 작업 필요
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    console.log("Get List", querySnapshot);
  } catch (error) {
    console.error("Failed to get portfolio data", error);
  }
}

// Get
export async function getPortfolio(id: string) {
  try {
    const docRef = doc(db, "portfolio", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Data does not exist");
    }

    return docSnap.data();
  } catch (error) {
    console.error("Failed to get portfolio data", error);
  }
}

interface SetParams {
  id: string;
  data: Object;
}
// Set
export async function setPortfolio({ id, data }: SetParams) {
  try {
    await setDoc(doc(db, "portfolio", id), data);
  } catch (error) {
    console.error("Failed to set portfolio", error);
  }
}
