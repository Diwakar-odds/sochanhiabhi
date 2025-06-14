// frontend/src/components/common/Modal.jsx
// !! HIGHLY RECOMMENDED TO USE shadcn/ui Dialog instead !!
// `npx shadcn@latest add dialog`
import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;