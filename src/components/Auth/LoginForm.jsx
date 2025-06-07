// frontend/src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button'; // Assuming shadcn/ui button
import { Input } from '../ui/input';   // Assuming shadcn/ui input
import { Label } from '../ui/label';   // Assuming shadcn/ui label

const LoginForm = ({ onLogin, isLoading, error }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ emailOrUsername, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">{error}</div>}
      <div>
        <Label htmlFor="emailOrUsername">Email or Username</Label>
        <Input
          id="emailOrUsername"
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
          disabled={isLoading}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;