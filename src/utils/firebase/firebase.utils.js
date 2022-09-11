import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCj1OVyvZblU1kJe3ydvwN5abvKQOjxqyQ",
  authDomain: "crwn-clothing-db-6459c.firebaseapp.com",
  projectId: "crwn-clothing-db-6459c",
  storageBucket: "crwn-clothing-db-6459c.appspot.com",
  messagingSenderId: "563609953046",
  appId: "1:563609953046:web:d8a8c89db39f1b87802637",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//Facebook Provider
facebookProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
//FIRESTORE
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const getUserDoc = await getDoc(userDocRef);
  console.log(getUserDoc);
  console.log(getUserDoc.exists());

  if (!getUserDoc.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
