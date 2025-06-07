// frontend/src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext is in this path

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Optional: add location fields if you want them on registration
    // const [city, setCity] = useState('');
    // const [zipCode, setZipCode] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Ensure useAuth is called at the top level of the component
    const auth = useAuth(); // Get the whole auth object
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!auth) {
            setError('Auth context is not available. Please try again later.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError(''); // Clear previous errors
        setLoading(true);

        try {
            // const locationData = city && zipCode ? { city, zipCode } : undefined;
            // Assuming your register function is part of the auth context
            await auth.register(username, email, password /*, locationData */);

            // If registration is successful, you might want to show a success message
            // and then redirect, or redirect immediately.
            // For now, redirecting to login.
            navigate('/login');
            // Example of setting a success message before redirect (would require state for success message)
            // setSuccess('Registration successful! Please log in.');
            // setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            // Assuming the error object from auth.register or axios has a response.data.message
            setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
            console.error("Registration error:", err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="standalone-form-page"> {/* Wrapper for centering */}
            <div className="form-container">
                <h2>Register</h2>
                {error && (
                    <div className={`alert ${error.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Choose a username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Enter your email"
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
                            minLength="6" // Example: Enforce min length
                            disabled={loading}
                            placeholder="Create a password (min. 6 characters)"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            placeholder="Confirm your password"
                        />
                    </div>

                    {/* Optional Location Fields Example
                    <div className="form-group">
                        <label htmlFor="city">City (Optional)</label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} disabled={loading} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipCode">Zip Code (Optional)</label>
                        <input type="text" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} disabled={loading} />
                    </div>
                    */}

                    <button type="submit" className="btn btn-primary-green btn-block" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p style={{ marginTop: '25px', textAlign: 'center', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}; // <<< THIS IS THE CLOSING BRACE FOR THE RegisterPage COMPONENT FUNCTION

export default RegisterPage; // <<< EXPORT STATEMENT AT THE TOP LEVEL