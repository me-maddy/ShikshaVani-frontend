import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import LoginForm from '../../components/user/LoginForm';

const Login: React.FC = () => {
  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Sign in to your account"
      footer={
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register now
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;