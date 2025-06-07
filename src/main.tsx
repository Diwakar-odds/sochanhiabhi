// frontend/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import './index.css'; // Vite's base styles (usually for Tailwind or resets)
import './App.css';   // Your global styles <--- MAKE SURE THIS IS IMPORTED

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);