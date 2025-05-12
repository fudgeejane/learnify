import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const useHandleUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (email, password, firstName, lastName) => {
    try {
      setLoading(true);
      setError(null);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with full name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        createdAt: serverTimestamp(),
      });

      // Send verification email
      await sendEmailVerification(user);

      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        throw new Error('Please verify your email before signing in.');
      }

      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);

      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);

      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setLoading(true);
      setError(null);

      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new Error('No user is currently signed in.');
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSignUp,
    handleSignIn,
    handleForgotPassword,
    handleSignOut,
    resendVerificationEmail,
  };
}; 