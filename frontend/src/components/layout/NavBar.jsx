import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const NavBar = () => {
  const { user, logout, hasRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">JWT React App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {/* Enlaces que se muestran solo al administrador */}
            {hasRole('ROLE_ADMIN') && (
              <Nav.Link as={Link} to="/admin">Panel Admin</Nav.Link>
            )}
            
            {/* Enlaces que se muestran solo al moderador */}
            {(hasRole('ROLE_MODERATOR')) && (
              <Nav.Link as={Link} to="/moderator">Panel Moderador</Nav.Link>
            )}
          </Nav>
          
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">
                  Bienvenido, {user.username}
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
