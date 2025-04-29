import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import RegisterForm from '../../components/user/RegisterForm';

const Register: React.FC = () => {
  return (
    <AuthLayout 
      title="Create your account"
      subtitle="Join our platform to provide valuable feedback"
      footer={
        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;