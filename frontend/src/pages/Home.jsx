import React, { useContext } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Container className="text-center">
      <h1 className="mb-4">Bienvenido a la Aplicación React con JWT</h1>

      {isAuthenticated ? (
        <Card className="p-4 shadow">
          <h3>¡Hola, {user.username}!</h3>
          <p>Ya has iniciado sesión. Puedes acceder a las funcionalidades según tu rol.</p>
          <div className="d-flex justify-content-center gap-2">
            
            {user.roles.includes('ROLE_ADMIN') && (
              <Button as={Link} to="/admin" variant="success">
                Panel de Administrador
              </Button>
            )}
            
            {(user.roles.includes('ROLE_MODERATOR')) && (
              <Button as={Link} to="/moderator" variant="info">
                Panel de Moderador
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <Card className="p-4 shadow">
          <h3>Accede a tu cuenta</h3>
          <p>Inicia sesión o regístrate para acceder a todas las funcionalidades.</p>
          <div className="d-flex justify-content-center gap-2">
            <Button as={Link} to="/login" variant="primary">
              Iniciar Sesión
            </Button>
            <Button as={Link} to="/register" variant="outline-primary">
              Registrarse
            </Button>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default Home;
