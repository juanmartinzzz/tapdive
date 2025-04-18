import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc } from "firebase/firestore";

const firestore = {
  helperSetCallbackOnQuerySnapshot: async ({query, callback}) => {
    onSnapshot(query, querySnapshot => {
      const documents = [];
      querySnapshot.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
      });

      callback({documents});
    })
  },
  helperUpsertDoc: async ({collectionName, data}) => {
    const dataToAdd = {
      createdAt: new Date(),
      ...data,
      updatedAt: new Date(),
    }

    try {
      if(data.id) {
        const docRef = await setDoc(doc(collection(db, collectionName), data.id), dataToAdd);

        return docRef;
      } else {
        const docRef = await addDoc(collection(db, collectionName), dataToAdd);

        return docRef;
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  },
  helperGetDoc: async ({collection, id}) => {
    const docRef = doc(db, collection, id);
    const snapshot = await getDoc(docRef);

    const data = {
      ...snapshot.data(),
      id: snapshot.id
    };

    return data;
  },
  tap: {
    upsert: async ({data}) => {
      const docRef = await firestore.helperUpsertDoc({collectionName: 'taps', data});

      return docRef;
    },
    get: async ({id}) => {
      const docRef = await firestore.helperGetDoc({collection: 'taps', id});

      return docRef;
    }
  }
}

export default firestore;