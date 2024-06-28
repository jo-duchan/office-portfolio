import { db } from "@/libs/firebase/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  CollectionMetadata,
  CollectionElement,
  ImageElement,
} from "@/type/collection";

export interface CollectionData {
  metadata: CollectionMetadata;
  collection: CollectionElement[];
}

interface SetParams {
  id: string;
  data: CollectionData;
}

// Get
export async function getCollection(id: string) {
  try {
    const docRef = doc(db, "collection", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Data does not exist");
    }

    return docSnap.data();
  } catch (error) {
    console.error("Failed to get collection data", error);
  }
}

// Set
export async function setCollection({ id, data }: SetParams) {
  try {
    console.log(id, data);
    await setDoc(doc(db, "collection", id), data);
  } catch (error) {
    console.error("Failed to set collection", error);
  }
}
