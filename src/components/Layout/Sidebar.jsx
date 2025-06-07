// frontend/src/components/Layout/Sidebar.tsx
import React, { useState } from 'react';
import { NavLink, useNavigate, Link } // useNavigate for logout
from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useAuth } from '../../contexts/AuthContext'; // Assuming you have this

// Import icons from react-icons
import {
    FaHome,
    FaThLarge,
    FaPlusCircle,
    FaExchangeAlt,
    FaEnvelope,
    FaMagic, // For AI Suggestions
    FaUserCircle,
    FaSignOutAlt,
    FaLeaf, // Or any suitable logo icon
    FaBars as Menu, // Hamburger icon
    FaTimes as CloseIcon, // Close icon
} from 'react-icons/fa';

const Sidebar = () => {
    const { user, logout } = useAuth(); // Get user and logout from context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Placeholder for active link styling
    const getNavLinkClass = ({ isActive }) => {
        return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
    };

    return (
        
        <div
            className={`${styles.sidebar} ${isEffectivelyExpanded ? styles.sidebarOpen : styles.sidebarClosed}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={styles.header}>
                <Link to="/dashboard" className={styles.logoLink} title="EcoSwapHub Dashboard">
                    <FaLeaf size={isEffectivelyExpanded ? 26 : 22} className={styles.logoIcon} />
                    {/* Conditionally render text based on expanded state for better control */}
                    <h1 className={`${styles.logoText} ${isEffectivelyExpanded ? styles.logoTextVisible : styles.logoTextHidden}`}>
                        EcoSwapHub
                    </h1>
                </Link>
                {/* Toggle button for pinning/unpinning */}
                <button
                    onClick={toggleSidebarPinnedState}
                    className={styles.toggleButton}
                    aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                >
                    {isSidebarOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <nav className={styles.navigation}>
                <ul>
                    {/* Use NavLink for navigation items to handle active state */}
                    
                    
                
                    <li>
                        <NavLink to="/dashboard" className={getNavLinkClass}>
                            <FaHome className={styles.navIcon} /> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/browse" className={getNavLinkClass}>
                            <FaThLarge className={styles.navIcon} /> Browse Items
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/list-item" className={getNavLinkClass}>
                            <FaPlusCircle className={styles.navIcon} /> List an Item
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/my-swaps" className={getNavLinkClass}>
                            <FaExchangeAlt className={styles.navIcon} /> My Swaps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/messages" className={getNavLinkClass}>
                            <FaEnvelope className={styles.navIcon} /> Messages
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/ai-suggestions" className={getNavLinkClass}>
                            <FaMagic className={styles.navIcon} /> AI Suggestions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={getNavLinkClass}>
                            <FaUserCircle className={styles.navIcon} /> Profile
                        </NavLink>
                    </li>

                     <li key={item.to}>
                            <NavLink to={item.to} className={getNavLinkClass} title={item.label}>
                                <item.icon className={styles.navIcon} />
                                <span className={`${styles.navText} ${isEffectivelyExpanded ? styles.navTextVisible : styles.navTextHidden}`}>
                                    {item.label}
                                </span>
                            </NavLink>
                        </li>
                    
                </ul>
            </nav>
            <div className={styles.userInfo}>
                <div className={`${styles.userDetails} ${isEffectivelyExpanded ? styles.userDetailsVisible : styles.userDetailsHidden}`}>
                {user && (
                    <>
                        <div className={styles.userName} title={user.username}>{user.username || 'User Name'}</div>
                            <div className={styles.userEmail} title={user.email}>{user.email || 'user@example.com'}</div>
                        </>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className={`${styles.logoutButton} ${!isEffectivelyExpanded ? styles.logoutButtonClosed : ''}`}
                    title="Log Out"
                >
                    <FaSignOutAlt className={styles.navIcon} />
                    <span className={`${styles.navText} ${isEffectivelyExpanded ? styles.navTextVisible : styles.navTextHidden}`}></span>
                    </button>

            </div>
        </div>
    );
};

export default Sidebar;