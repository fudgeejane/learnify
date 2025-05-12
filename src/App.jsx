import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Index from './index';
import Dashboard from './pages/Dashboard';
import Layout from './layout/Layout';
import Loading from './Loading';

// Protected Route Component
const ProtectedRoute = ({ children, user }) => {
  if (!user || !user.emailVerified) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user && user.emailVerified ? <Navigate to="/dashboard" replace /> : <Index />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
