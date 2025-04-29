import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import FacultyLoginForm from '../../components/faculty/LoginForm';

const FacultyLogin: React.FC = () => {
  return (
    <AuthLayout 
      title="Faculty Login"
      subtitle="Sign in to your faculty account"
      type="faculty"
      footer={
        <p>
          Don't have an account?{' '}
          <Link to="/faculty/register" className="font-medium text-purple-600 hover:text-purple-500">
            Register now
          </Link>
        </p>
      }
    >
      <FacultyLoginForm />
    </AuthLayout>
  );
};

export default FacultyLogin;