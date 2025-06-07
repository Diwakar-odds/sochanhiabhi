// frontend/src/components/common/Spinner.jsx
import React from 'react';

const Spinner = ({ size = 'md', color = 'text-primary' }) => { // Assuming --primary is defined for shadcn/ui
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={`animate-spin rounded-full ${sizes[size]} border-b-2 border-t-2 ${color} border-current`}
        // style={{ borderColor: 'currentColor', borderBottomColor: 'transparent' }} // More traditional spinner
      ></div>
    </div>
  );
};

export default Spinner;