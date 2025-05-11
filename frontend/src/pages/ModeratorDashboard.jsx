import React from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';

const ModeratorDashboard = () => {
  const mockContent = [
    { id: 1, title: 'Primer post', status: 'approved', author: 'user1', createdAt: '2025-05-08' },
    { id: 2, title: 'Contenido inapropiado', status: 'rejected', author: 'user2', createdAt: '2025-05-09' },
    { id: 3, title: 'Nueva publicación', status: 'pending', author: 'user3', createdAt: '2025-05-10' },
    { id: 4, title: 'Otro contenido', status: 'pending', author: 'user1', createdAt: '2025-05-10' },
  ];

  return (
    <div>
      <h1 className="mb-4">Panel de Moderador</h1>
      
      <Card className="shadow mb-4">
        <Card.Header as="h5">Contenido pendiente de revisión</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockContent.map(content => (
                <tr key={content.id}>
                  <td>{content.id}</td>
                  <td>{content.title}</td>
                  <td>{content.author}</td>
                  <td>{content.createdAt}</td>
                  <td>
                    <Badge bg={
                      content.status === 'approved' ? 'success' : 
                      content.status === 'rejected' ? 'danger' : 
                      'warning'
                    }>
                      {content.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline-success" size="sm" className="me-2">
                      Aprobar
                    </Button>
                    <Button variant="outline-danger" size="sm" className="me-2">
                      Rechazar
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Detalles
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      <Card className="shadow">
        <Card.Header as="h5">Resumen de Moderación</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-4">
              <div className="text-center p-3 bg-light rounded">
                <h3>2</h3>
                <p>Pendientes</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3 bg-light rounded">
                <h3>1</h3>
                <p>Aprobados</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3 bg-light rounded">
                <h3>1</h3>
                <p>Rechazados</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ModeratorDashboard;
