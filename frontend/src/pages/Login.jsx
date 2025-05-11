import React, { useContext, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Button, Alert } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('El nombre de usuario es obligatorio'),
  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    try {
      const result = await login(values);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error al iniciar sesión: ", err)
      setError('Error al iniciar sesión');
    }
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                <Field
                  type="text"
                  name="username"
                  className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="username" component="div" className="invalid-feedback" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>

              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting} 
                className="w-100 mt-3"
              >
                {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
              </Button>
            </Form>
          )}
        </Formik>
        
        <div className="mt-3 text-center">
          <p>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
