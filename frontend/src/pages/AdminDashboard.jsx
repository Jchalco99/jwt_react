import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  const mockUsers = [
    { id: 1, username: 'user1', email: 'user1@example.com', roles: ['ROLE_USER'] },
    { id: 2, username: 'moderator1', email: 'mod1@example.com', roles: ['ROLE_MODERATOR'] },
    { id: 3, username: 'admin1', email: 'admin@example.com', roles: ['ROLE_ADMIN'] },
    { id: 4, username: 'user2', email: 'user2@example.com', roles: ['ROLE_USER'] },
  ];

  return (
    <div>
      <h1 className="mb-4">Panel de Administrador</h1>
      
      <Card className="shadow mb-4">
        <Card.Header as="h5">Gestión de Usuarios</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.roles.map((role, index) => (
                      <span 
                        key={index} 
                        className={`badge ${
                          role === 'ROLE_ADMIN' ? 'bg-danger' : 
                          role === 'ROLE_MODERATOR' ? 'bg-warning text-dark' : 
                          'bg-info text-dark'
                        } me-1`}
                      >
                        {role.replace('ROLE_', '')}
                      </span>
                    ))}
                  </td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Editar
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="success">Agregar Usuario</Button>
        </Card.Body>
      </Card>
      
      <Card className="shadow">
        <Card.Header as="h5">Estadísticas del Sistema</Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-4">
              <div className="text-center p-3 bg-light rounded">
                <h3>{mockUsers.length}</h3>
                <p>Total Usuarios</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3 bg-light rounded">
                <h3>1</h3>
                <p>Administradores</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-3 bg-light rounded">
                <h3>1</h3>
                <p>Moderadores</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminDashboard;
