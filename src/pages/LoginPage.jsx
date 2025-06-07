// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this import is correct

const LoginPage = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth(); // Get the login function from our AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        setLoading(true);

        // console.log("LoginPage: Attempting to log in with", emailOrUsername); // For debugging

        try {
            // This is the actual API call via AuthContext
            await login(emailOrUsername, password);
            // console.log("LoginPage: Login successful, navigating to /"); // For debugging
            navigate('/'); // Redirect to dashboard (or root, which then redirects) on successful login
        } catch (err) {
            // This will catch errors thrown from AuthContext's login function
            // (which should be errors from the API response)
            const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials and try again.';
            setError(errorMessage);
            console.error("LoginPage: Login error -", errorMessage, "Full error object:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container"> {/* Ensure .form-container styles are in App.css or global.css */}
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/* Ensure .alert styles are present */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="emailOrUsername">Email or Username</label>
                    <input
                        type="text"
                        id="emailOrUsername"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" className="btn btn-primary-green btn-block" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;