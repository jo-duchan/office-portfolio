import { db } from "@/libs/firebase/firebase-config";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { CollectionMetadata, CollectionElement } from "@/type/collection";

export interface CollectionData {
  metadata: CollectionMetadata;
  collection: CollectionElement[];
}

interface SetParams {
  id: string;
  data: CollectionData;
}

const COLLECTION_PATH = "collection";

export async function getCollection(id: string) {
  try {
    const docRef = doc(db, COLLECTION_PATH, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Data does not exist");
    }

    return docSnap.data();
  } catch (error) {
    console.error("Failed to get collection data", error);
  }
}

export async function setCollection({ id, data }: SetParams) {
  try {
    await setDoc(doc(db, COLLECTION_PATH, id), data);
  } catch (error) {
    console.error("Failed to set collection", error);
  }
}

export async function deleteCollection(id: string) {
  try {
    await deleteDoc(doc(db, COLLECTION_PATH, id));
  } catch (error) {
    console.error("Failed to delete collection data", error);
  }
}
