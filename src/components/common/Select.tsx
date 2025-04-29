import React, { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`mb-4 ${widthClass}`}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <select
        className={`
          px-3 py-2 bg-white border rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 
          ${error ? 'border-red-500' : 'border-gray-300'} 
          ${widthClass} 
          ${className}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;