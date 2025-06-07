// frontend/src/components/Layout/Footer.tsx
import React from 'react';
import './Footer.css'; // We'll create this CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>© {new Date().getFullYear()} EcoSwapHub. All rights reserved.</p>
                {/* Add more links later if needed */}
                {/* <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> */}
            </div>
        </footer>
    );
};

export default Footer;