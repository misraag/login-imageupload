// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Registration from './Components/Registration/Registration';

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyCj38jwI6YA1AtDJKQuzzmoJvgcrUdD5Ho",
  authDomain: "login-imageupload.firebaseapp.com",
  projectId: "login-imageupload",
  storageBucket: "login-imageupload.appspot.com",
  messagingSenderId: "689419057967",
  appId: "1:689419057967:web:84d8d5764c86f2df7e7fda"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<PrivateRoute user={user} handleLogout={handleLogout} />} />
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ user, handleLogout }) => {
  return user ? (
    <Home user={user} handleLogout={handleLogout} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
