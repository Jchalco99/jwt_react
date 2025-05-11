import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginService, registerService, logoutService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Verificar si hay un token almacenado al iniciar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({
            id: userData.id || decoded.id,
            username: userData.username || decoded.sub,
            email: userData.email,
            roles: userData.roles || decoded.roles || []
          });
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);
  
  // Función para iniciar sesión
  const login = async (credentials) => {
    try {
      const response = await loginService(credentials);
      const { token, userData } = response;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      let decodedRoles = [];
      try {
        const decoded = jwtDecode(token);
        decodedRoles = decoded.roles || [];
      } catch (decodeError) {
        console.error("Error al decodificar el token: ", decodeError)
        console.warn("No se pudo decodificar roles del token, usando los de la respuesta");
      }
      
      setUser({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        roles: userData.roles || decodedRoles
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  };
  
  // Función para registrarse
  const register = async (userData) => {
    try {
      const response = await registerService(userData);
      return { success: true, message: response.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al registrarse' 
      };
    }
  };
  
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    logoutService();
  };
  
  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user?.roles?.includes(role) || false;
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      hasRole,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
