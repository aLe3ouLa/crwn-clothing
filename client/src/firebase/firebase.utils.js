import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAfsS1JW74WcmuRknD3gtWVMGpLIKj-39c",
    authDomain: "crwn-db-ad3d5.firebaseapp.com",
    databaseURL: "https://crwn-db-ad3d5.firebaseio.com",
    projectId: "crwn-db-ad3d5",
    storageBucket: "crwn-db-ad3d5.appspot.com",
    messagingSenderId: "188956813914",
    appId: "1:188956813914:web:59c4a2cf46b4896c1c8663",
    measurementId: "G-DB3CYPS6ND"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(
    obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj)
    }
  );

  return await batch.commit();
}

export const convertCollectionSnapshotsToMap = ( collections ) => {
  const transformedCollection = collections.docs.map( doc => {
      const { title , items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    }
  );

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
     }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
