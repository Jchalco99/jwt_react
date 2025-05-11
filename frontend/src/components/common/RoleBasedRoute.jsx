import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const RoleBasedRoute = ({ children, role }) => {
  const { user, hasRole, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }
  
  if (!user || !hasRole(role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default RoleBasedRoute;
