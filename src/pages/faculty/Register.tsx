import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import FacultyRegisterForm from '../../components/faculty/RegisterForm';

const FacultyRegister: React.FC = () => {
  return (
    <AuthLayout 
      title="Faculty Registration"
      subtitle="Create your faculty account"
      type="faculty"
      footer={
        <p>
          Already have an account?{' '}
          <Link to="/faculty/login" className="font-medium text-purple-600 hover:text-purple-500">
            Sign in
          </Link>
        </p>
      }
    >
      <FacultyRegisterForm />
    </AuthLayout>
  );
};

export default FacultyRegister;