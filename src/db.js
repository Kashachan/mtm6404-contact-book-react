import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgRkYAYxzQhl3pWEQk5gf0aNX0n_zfmGg",
  authDomain: "contact-book-fdb9c.firebaseapp.com",
  projectId: "contact-book-fdb9c",
  storageBucket: "contact-book-fdb9c.appspot.com",
  messagingSenderId: "968905306670",
  appId: "1:968905306670:web:e5a964fd068962bb5525bf",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export async function getContact(id) {
  try {
    const docRef = doc(db, "contacts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such contact found!");
      return null;
    }
  } catch (error) {
    console.error("Error getting contact:", error);
    throw error;
  }
}

// Update a contact 
export async function updateContact(id, data) {
  try {
    const docRef = doc(db, "contacts", id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}

// Delete a contact 
export async function deleteContact(id) {
  try {
    const docRef = doc(db, "contacts", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
}
