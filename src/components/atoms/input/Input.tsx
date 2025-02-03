import React, { ChangeEvent } from 'react';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full p-3 border-2 border-gray-300 rounded-lg  
        focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
        transition-all duration-200 ease-in-out
        hover:border-gray-400
        ${className}
      `}
    />
  );
};