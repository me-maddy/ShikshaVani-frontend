import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: 'user' | 'faculty';
  requireFullRegistration?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  userType,
  requireFullRegistration = false,
}) => {
  const { user, faculty, isFullyRegistered, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (userType === 'user') {
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    if (requireFullRegistration && !isFullyRegistered) {
      return <Navigate to="/select-faculty-class" />;
    }
  } else if (userType === 'faculty') {
    if (!faculty) {
      return <Navigate to="/faculty/login" />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;