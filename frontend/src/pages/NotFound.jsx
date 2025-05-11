import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center">
      <Card className="p-5 shadow">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Página no encontrada</h2>
        <p className="lead mb-4">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <div>
          <Button as={Link} to="/" variant="primary">
            Volver a la página principal
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default NotFound;
