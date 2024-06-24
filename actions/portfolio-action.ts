import { db } from "@/libs/firebase/firebase-config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { CollectionSimple } from "@/type/portfolio";

interface SetParams {
  id: string;
  data: CollectionSimple;
}

// Get List
export async function getPortfolio(id: string) {
  try {
    // pagination 작업 필요
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    console.log("Get List", querySnapshot);
  } catch (error) {
    console.error("Failed to get portfolio data", error);
  }
}

// Set List
export async function setPortfolio({ id, data }: SetParams) {
  try {
    await setDoc(doc(db, "portfolio", id), data);
  } catch (error) {
    console.error("Failed to set portfolio", error);
  }
}

//
// Check Duplicate
export async function checkForDuplicates(id: string) {
  try {
    const docRef = doc(db, "portfolio", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // No duplicate data
      return false;
    }

    // Data duplicated
    return true;
  } catch (error) {
    console.error("Failed to get collection data", error);
  }
}
