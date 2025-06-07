// frontend/src/components/common/Notification.jsx
// !! HIGHLY RECOMMENDED TO USE shadcn/ui Sonner/Toast instead !!
// `npx shadcn@latest add sonner` and use `toast()` from "sonner"
import React from 'react';

const Notification = ({ message, type = "info", onClose }) => {
  if (!message) return null;

  const baseStyle = "p-4 mb-4 rounded-md shadow-md text-sm";
  const types = {
    info: "bg-blue-100 border border-blue-300 text-blue-700",
    success: "bg-green-100 border border-green-300 text-green-700",
    warning: "bg-yellow-100 border border-yellow-300 text-yellow-700",
    error: "bg-red-100 border border-red-300 text-red-700",
  };

  return (
    <div className={`${baseStyle} ${types[type]} flex justify-between items-center`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-lg font-semibold hover:opacity-75">×</button>
      )}
    </div>
  );
};
export default Notification;