import { db } from "../config/firebase";
import { addDoc, collection, deleteDoc, doc, documentId, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";

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
  helperGetDocs: async ({collectionName, ids = null}) => {
    const settings = {query: query(collection(db, collectionName))};

    if(ids) {
      settings.query = query(collection(db, collectionName), where(documentId(), 'in', ids));
    }

    const snapshot = await getDocs(settings.query);

    return snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
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
      const dataToUpsert = {
        isPublic: true,
        ...data
      }
      const docRef = await firestore.helperUpsertDoc({collectionName: 'taps', data});

      return docRef;
    },
    get: async ({id}) => {
      const docRef = await firestore.helperGetDoc({collection: 'taps', id});

      return docRef;
    },
    getMany: async ({ids}) => {
      const docRefs = await firestore.helperGetDocs({collectionName: 'taps', ids});

      return docRefs;
    }
  },
  userTapId: {
    upsert: async ({userId, data}) => {
      const docRef = await firestore.helperUpsertDoc({collectionName: `users/${userId}/tapIds`, data});

      return docRef;
    },
    get: async ({userId}) => {
      const docRef = await firestore.helperGetDocs({collectionName: `users/${userId}/tapIds`});

      return docRef;
    }
  },
  user: {
    upsert: async ({data}) => {
      const docRef = await firestore.helperUpsertDoc({collectionName: 'users', data});

      return docRef;
    }
  },
  space: {
    upsert: async ({data}) => {
      const dataToUpsert = {
        isPublic: true,
        ...data
      }
      const docRef = await firestore.helperUpsertDoc({collectionName: 'spaces', data: dataToUpsert});

      return docRef;
    },
    get: async ({id}) => {
      const docRef = await firestore.helperGetDoc({collection: 'spaces', id});

      return docRef;
    },
    getForUser: async ({userId}) => {
      const docRefs = await firestore.helperGetDocs({collectionName: 'spaces', ids: null});

      // Filter spaces for the current user
      const userSpaces = docRefs.filter(space => space.userId === userId);

      return userSpaces;
    }
  },
  userSpaceId: {
    upsert: async ({userId, data}) => {
      const docRef = await firestore.helperUpsertDoc({collectionName: `users/${userId}/spaceIds`, data});

      return docRef;
    },
    get: async ({userId}) => {
      const docRef = await firestore.helperGetDocs({collectionName: `users/${userId}/spaceIds`});

      return docRef;
    }
  }
}

export default firestore;