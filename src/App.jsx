import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './auth/Landing';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth/components/PrivateRoute';
import PublicRoute from './auth/components/PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
