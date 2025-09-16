import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './features/auth/Login.jsx';
import Register from './features/auth/Register.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import WorkoutPage from './pages/WorkoutPage.jsx'

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Rotta pubblica: Login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        {/* Rotta pubblica: Registrazione */}
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <Register />}
        />
        {/* Rotta privata: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
          {/* Rotta privata: Profilo */}
        <Route
          path="/user"
          element={
            <PrivateRoute>        
              <ProfilePage/>
            </PrivateRoute>
          }
        />

        {/* Rotta privata: Profilo */}
        <Route
          path="/workout"
          element={
            <PrivateRoute>        
              <WorkoutPage/>
            </PrivateRoute>
          }
        />
        {/* Redirect alla dashboard se loggato, altrimenti login */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;