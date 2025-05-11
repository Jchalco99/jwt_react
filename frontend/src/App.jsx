import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import RoleBasedRoute from './components/common/RoleBasedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/admin" 
            element={
              <RoleBasedRoute role="ROLE_ADMIN">
                <AdminDashboard />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/moderator" 
            element={
              <RoleBasedRoute role="ROLE_MODERATOR">
                <ModeratorDashboard />
              </RoleBasedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
