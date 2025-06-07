// frontend/src/pages/HomePage.tsx
import React from 'react';

const HomePage = () => {
    return (
        <div className="container">
            <h1>Welcome to EcoSwapHub!</h1>
            <p>Swap your pre-loved items and contribute to a sustainable future.</p>
            {/* We'll add item listings here later */}
            <h2>Recently Added Items</h2>
            <div style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                <p>(Item cards will go here)</p>
            </div>
        </div>
    );
};

export default HomePage;