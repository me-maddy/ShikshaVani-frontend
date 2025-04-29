import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;