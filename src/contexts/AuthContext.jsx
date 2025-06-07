// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create Context
const AuthContext = createContext(null); // Initialize with null or a default shape

// Custom hook to use AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined || context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Initialize token from localStorage. If it's not there, getItem returns null.
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true); // For initial auth check and during API calls

    // Configure axios instance
    // Using useCallback to memoize the api instance creation if it were more complex
    // or depended on state/props, but for a simple baseURL it's minor.
    const api = React.useMemo(() =>
        axios.create({
            baseURL: '/api', // Uses Vite proxy during development
        }),
    []); // Empty dependency array means it's created once


    // Set Authorization header whenever the token changes
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authToken', token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
        }
    }, [token, api]); // Rerun when token or api instance changes


    const fetchCurrentUser = useCallback(async () => {
        // No need to set setLoading(true) here if it's only for initial load,
        // as loading is already true. If called at other times, you might add it.
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await api.get('/auth/me');
            setUser(response.data);
        } catch (err) {
            console.error('Failed to fetch current user or token expired:', err.response ? err.response.data : err.message);
            // Token might be invalid/expired, clear it
            setToken(null); // This will trigger the useEffect above to remove from localStorage and headers
            setUser(null);
        } finally {
            setLoading(false); // CRUCIAL: Always set loading to false
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api, token]); // Removed setToken from dependencies as it can cause loops if not careful
                      // token is enough, as setToken(null) above will trigger re-evaluation


    // Effect for initial authentication check on component mount
    useEffect(() => {
        setLoading(true); // Ensure loading is true for the initial fetch
        fetchCurrentUser();
    }, [fetchCurrentUser]); // Run when fetchCurrentUser (which depends on token) changes or on mount


    const register = async (username, email, password, location) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/register', {
                username,
                email,
                password,
                location,
            });
            // Assuming backend doesn't auto-login or return token on register for this flow
            // If it does, you'd setToken and setUser here.
            // For now, just return the success or data.
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            throw error; // Re-throw to be caught by the calling component
        }
    };

    // frontend/src/contexts/AuthContext.tsx
// ... (other parts of AuthContext)

    const login = async (emailOrUsername, password) => {
        setLoading(true); // You might want to set loading specifically for login operations
        try {
            // console.log("AuthContext: Calling API to login with", emailOrUsername); // For debugging
            const response = await api.post('/auth/login', { // 'api' is the configured axios instance
                emailOrUsername,
                password,
            });
            const { token: newToken, ...userData } = response.data;

            setToken(newToken); // This will trigger useEffect to save to localStorage & set axios header
            setUser(userData);
            // setLoading(false); // setLoading(false) is in the finally block for this function
            return userData; // Indicate success
        } catch (error) {
            // console.error("AuthContext: API login error -", error.response ? error.response.data : error.message); // For debugging
            // No need to call setError here, as LoginPage will handle it
            throw error; // Re-throw the error so the calling component (LoginPage) can catch it
        } finally {
            setLoading(false); // Ensure loading is always set to false after the operation
        }
    };

// ... (rest of AuthContext)
    const logout = useCallback(() => {
        // No API call for logout in this example, just client-side
        setToken(null); // This triggers useEffect to clear localStorage and headers
        setUser(null);
        // navigate('/login'); // Navigation should be handled by the component calling logout
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]); // api dependency if you were to make a logout API call

    const value = React.useMemo(() => ({
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token, // More robust check
        register,
        login,
        logout,
        fetchCurrentUser, // Expose if needed for manual re-fetch
    }), [user, token, loading, login, register, logout, fetchCurrentUser]); // Added memoized dependencies

    return (
        <AuthContext.Provider value={value}>
            {/* Render children immediately, pages/components can use `loading` state from context */}
            {children}
        </AuthContext.Provider>
    );
};