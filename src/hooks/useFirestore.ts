import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, DocumentData, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useFirestoreCollection(collectionName: string) {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('created_at', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching collection:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  const addItem = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return docRef.id;
    } catch (err) {
      console.error('Error adding document:', err);
      throw err;
    }
  };

  const updateItem = async (id: string, data: any) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error updating document:', err);
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      console.error('Error deleting document:', err);
      throw err;
    }
  };

  return { data, loading, error, addItem, updateItem, deleteItem };
}

export function useFirestoreDocument(collectionName: string, documentId: string) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const docRef = doc(db, collectionName, documentId);
    
    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching document:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, documentId]);

  const updateDocument = async (data: any) => {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, {
        ...data,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error updating document:', err);
      throw err;
    }
  };

  return { data, loading, error, updateDocument };
}