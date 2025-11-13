// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Email login
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
  };

  // Google login
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() => setLoading(false));
  };

  // Register
  const register = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return updateProfile(res.user, { displayName, photoURL }).then(() => res.user);
      })
      .finally(() => setLoading(false));
  };

  // Logout
  const logout = () => signOut(auth);

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = () => useContext(AuthContext);
