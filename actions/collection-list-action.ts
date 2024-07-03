import { db } from "@/libs/firebase/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { CollectionSimple } from "@/type/collection-list";

const COLLECTION_SIMPLE_PATH = "collection-list";

interface SetParams {
  id: string;
  data: CollectionSimple;
}

export async function getCollectionAllList() {
  try {
    // pagination 작업 필요
    const q = query(
      collection(db, COLLECTION_SIMPLE_PATH),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  } catch (error) {
    console.error("Failed to get collection list data", error);
  }
}

export async function getCollectionPublicList() {
  try {
    // pagination 작업 필요
    const q = query(
      collection(db, COLLECTION_SIMPLE_PATH),
      where("publish", "==", true),
      orderBy("publish"),
      orderBy("order")
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  } catch (error) {
    console.error("Failed to get collection list data", error);
  }
}

export async function setCollectionSimple({ id, data }: SetParams) {
  try {
    await setDoc(doc(db, COLLECTION_SIMPLE_PATH, id), data);
  } catch (error) {
    console.error("Failed to set collection simple", error);
  }
}

export async function getCollectionSimple(id: string) {
  try {
    const docRef = doc(db, COLLECTION_SIMPLE_PATH, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Data does not exist");
    }
    return docSnap.data();
  } catch (error) {
    console.error("Failed to get collection simple data", error);
  }
}

export async function deleteCollectionSimple(id: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_SIMPLE_PATH, id));
  } catch (error) {
    console.error("Failed to delete collection simple data", error);
  }
}

// Check Duplicate
export async function checkForDuplicates(id: string) {
  try {
    const docRef = doc(db, COLLECTION_SIMPLE_PATH, id);
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
