import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

// Function for signing up a user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function for signing in a user with email and password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to send email verification
export const doSendEmailVerification = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent successfully.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error(error.message);
    }
  } else {
    throw new Error("No user is currently signed in.");
  }
};

// Function to reset password by sending a reset email
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to add user data to Firestore
export const addUserToFirestore = async (uid, firstName, lastName, email) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get user data from Firestore
export const getUserFromFirestore = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    }
    throw new Error("User not found in Firestore.");
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to sign out the user
export const doSignOut = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Function for signing in with Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function for signing in with Facebook
export const doSignInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Setup authentication state listener
export const setupAuthStateListener = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
      };
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
    callback(user);
  });
};
