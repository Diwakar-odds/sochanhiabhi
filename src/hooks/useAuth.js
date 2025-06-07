// frontend/src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx'; // Assuming AuthContext is default export or you named it AuthContext variable

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) { // Or if AuthContext was initialized to null: if (context === null)
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};