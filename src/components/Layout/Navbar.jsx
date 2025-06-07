// frontend/src/components/Layout/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// We'll need AuthContext later to show different links based on auth state
// import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css'; // We'll create this CSS file

const Navbar = () => {
    // const { user, logout } = useAuth(); // Will use this later
    const navigate = useNavigate();
    const user = null; // Placeholder for now
    const logout = () => console.log("Logout clicked"); // Placeholder

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    EcoSwapHub
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/browse" className="nav-links">
                            Browse Items
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link to="/list-item" className="nav-links">
                                    List an Item
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/my-swaps" className="nav-links">
                                    My Swaps
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-links">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="nav-links-button">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-links">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-links">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;