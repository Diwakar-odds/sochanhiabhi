// frontend/src/components/common/Button.jsx
// !! HIGHLY RECOMMENDED TO USE shadcn/ui Button instead !!
// `npx shadcn@latest add button` then import { Button } from '@/components/ui/button';
import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = '', disabled = false, ...props }) => {
  // Basic styling, Tailwind would be better here
  const baseStyle = "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-400",
    outline: "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 focus:ring-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; // If you make it default
// Or for named: export { Button };