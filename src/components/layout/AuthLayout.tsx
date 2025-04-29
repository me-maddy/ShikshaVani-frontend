import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  type?: 'user' | 'faculty';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  footer,
  type = 'user',
}) => {
  const bgColor = type === 'user' ? 'bg-blue-600' : 'bg-purple-600';
  const linkColor = type === 'user' ? 'text-blue-600' : 'text-purple-600';
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className={`text-center text-3xl font-extrabold text-gray-900 ${type === 'faculty' ? 'text-purple-800' : 'text-blue-800'}`}>
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-gray-600">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
          {children}
          
          {footer && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              <div className="mt-6 text-center text-sm">
                {footer}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/"
            className={`font-medium hover:underline ${linkColor}`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;