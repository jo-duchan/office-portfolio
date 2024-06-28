import { db } from "@/libs/firebase/firebase-config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { CollectionSimple } from "@/type/collection-list";

interface SetParams {
  id: string;
  data: CollectionSimple;
}

export async function getCollectionList() {
  try {
    // pagination 작업 필요
    const querySnapshot = await getDocs(collection(db, "collection-list"));
    console.log("Get List", querySnapshot);
  } catch (error) {
    console.error("Failed to get collection list data", error);
  }
}

export async function setCollectionSimple({ id, data }: SetParams) {
  try {
    await setDoc(doc(db, "collection-list", id), data);
  } catch (error) {
    console.error("Failed to set collection simple", error);
  }
}

export async function getCollectionSimple(id: string) {
  try {
    const docRef = doc(db, "collection-list", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Data does not exist");
    }
    return docSnap.data();
  } catch (error) {
    console.error("Failed to get collection simple data", error);
  }
}

//
// Check Duplicate
export async function checkForDuplicates(id: string) {
  try {
    const docRef = doc(db, "collection-list", id);
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
