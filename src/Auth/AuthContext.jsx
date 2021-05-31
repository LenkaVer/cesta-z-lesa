import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from './../firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const signupAnonymous = () => {
    return auth.signInAnonymously();
  };

  const createUserData = (uid, username) => {
    db.collection('users')
      .doc(uid)
      .set({
        username: username,
        bestScore: 0,
        countWins: 0,
        countLosses: 0,
      })
      .then(() => {
        //console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const updateUserData = (uid, userData) => {
    db.collection('users')
      .doc(uid)
      .set(userData)
      .then(() => {
        //console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    setCurrentUserData(null);
    return auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  const fetchUserData = (uid) => {
    db.collection('users')
      .doc(uid)
      .onSnapshot((query) => {
        const userData = query.data();
        if (userData) {
          setCurrentUserData(userData);
          setLoading2(false);
        }
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    } else {
      setCurrentUserData(null);
      setLoading2(false);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    currentUserData,
    login,
    signup,
    signupAnonymous,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    createUserData,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && !loading2 && children}
    </AuthContext.Provider>
  );
};
