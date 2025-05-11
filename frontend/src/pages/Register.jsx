import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Button, Alert } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(20, 'El nombre de usuario debe tener como máximo 20 caracteres')
    .required('El nombre de usuario es obligatorio'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Confirmar contraseña es obligatorio')
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');
    setSuccess('');
    
    try {
      const result = await register({
        username: values.username,
        email: values.email,
        password: values.password,
        roles: ["user"]
      });
      
      if (result.success) {
        setSuccess('Registro exitoso! Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error al registrarse: ", err)
      setError('Error al registrarse');
    }
    
    setSubmitting(false);
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="p-4 shadow" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Registro</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
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
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
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

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </div>

              <Button 
                variant="primary" 
                type="submit" 
                disabled={isSubmitting} 
                className="w-100 mt-3"
              >
                {isSubmitting ? 'Registrando...' : 'Registrarse'}
              </Button>
            </Form>
          )}
        </Formik>
        
        <div className="mt-3 text-center">
          <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
