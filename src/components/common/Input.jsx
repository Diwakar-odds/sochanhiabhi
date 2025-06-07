// frontend/src/components/common/Input.jsx
// !! HIGHLY RECOMMENDED TO USE shadcn/ui Input instead !!
// `npx shadcn@latest add input` then import { Input } from '@/components/ui/input';
import React from 'react';

const Input = ({ type = "text", value, onChange, placeholder, className = '', disabled = false, ...props }) => {
  const baseStyle = "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseStyle} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};
export default Input;