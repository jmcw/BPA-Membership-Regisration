import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'email' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  description?: string;
  options?: Array<{ value: string; label: string }>;
}

export function FormField({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
  description,
  options
}: FormFieldProps) {
  const inputClasses = `mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
    error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-[#0B56A3] focus:ring-[#0B56A3]'
  }`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          required={required}
        >
          <option value="">Select {label}</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          required={required}
        />
      )}
      
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}