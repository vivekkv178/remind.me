import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const addDocument = async ({ collectionName, document }) => {
  try {
    const addResponse = await addDoc(collection(db, collectionName), document);
    return addResponse;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateDocument = async ({
  collectionName,
  documentId,
  document,
}) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const updateResponse = await updateDoc(docRef, document);
    return updateResponse;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDocument = async ({ collectionName, documentId }) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return { doc_id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
};

export const deleteDocument = async ({ collectionName, documentId }) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const deleteResponse = await deleteDoc(docRef, document);
    return deleteResponse;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const listCollection = async ({ collectionName }) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({
        doc_id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addSubDocument = async ({
  collectionName,
  documentId,
  subCollectionName,
  document,
}) => {
  try {
    const parentDocRef = doc(db, collectionName, documentId);
    const subCollectionRef = collection(parentDocRef, subCollectionName);

    const docRef = await addDoc(subCollectionRef, document);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const setSubDocument = async ({
  collectionName,
  documentId,
  subCollectionName,
  subDocumentId,
  document,
}) => {
  try {
    const parentDocRef = doc(db, collectionName, documentId);
    const subCollectionRef = collection(parentDocRef, subCollectionName);

    const subDocumentRef = doc(subCollectionRef, subDocumentId);

    await setDoc(subDocumentRef, document);

    return subDocumentRef;
  } catch (e) {
    console.error("Error setting subdocument: ", e);
    throw e;
  }
};

export const getSubDocument = async ({
  collectionName,
  parentDocumentId,
  subCollectionName,
  subDocumentId,
}) => {
  try {
    const parentDocRef = doc(db, collectionName, parentDocumentId);
    const subCollectionRef = collection(parentDocRef, subCollectionName);
    const subDocumentRef = doc(subCollectionRef, subDocumentId);

    const subDocumentSnapshot = await getDoc(subDocumentRef);
    if (subDocumentSnapshot.exists()) {
      return { doc_id: subDocumentSnapshot.id, ...subDocumentSnapshot.data() };
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error getting subdocument: ", e);
    throw e;
  }
};

export const listSubCollection = async ({
  parentCollectionName,
  parentDocumentId,
  subCollectionName,
}) => {
  try {
    try {
      const parentDocRef = collection(db, parentCollectionName);
      const subCollectionRef = collection(
        parentDocRef,
        parentDocumentId,
        subCollectionName
      );
      const querySnapshot = await getDocs(subCollectionRef);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          doc_id: doc.id,
          ...doc.data(),
        });
      });
      return data;
    } catch (error) {
      console.error("Error listing documents: ", error);
    }
  } catch (error) {
    console.error("Error listing documents: ", error);
  }
};

export const deleteSubDocument = async ({
  collectionName,
  parentDocumentId,
  subCollectionName,
  subDocumentId,
}) => {
  try {
    const parentDocRef = doc(db, collectionName, parentDocumentId);
    const subCollectionRef = collection(parentDocRef, subCollectionName);
    const subDocumentRef = doc(subCollectionRef, subDocumentId);

    await deleteDoc(subDocumentRef);
  } catch (e) {
    console.error("Error deleting subdocument: ", e);
    throw e;
  }
};
