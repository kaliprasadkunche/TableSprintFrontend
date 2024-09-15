import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Updated import

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useAuth(); // Updated usage

  console.log('Auth state:', auth);

  return auth && auth.token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
