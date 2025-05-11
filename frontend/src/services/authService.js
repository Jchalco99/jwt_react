import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

// Configurar el interceptor para incluir el token en las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicio para iniciar sesión
export const loginService = async (credentials) => {
  const response = await axios.post(API_URL + 'signin', credentials);
  return {
    token: response.data.accessToken,
    userData: {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      roles: response.data.roles
    }
  };
};

// Servicio para registrar un nuevo usuario
export const registerService = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData);
  return response.data;
};

// Servicio para cerrar sesión
export const logoutService = async () => {
  return true;
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Error 401 detectado:', error.config.url);
      if (!error.config.url.includes('/signin')) {
        localStorage.removeItem('token');
        window.location = '/login';
      }
    }
    return Promise.reject(error);
  }
);
