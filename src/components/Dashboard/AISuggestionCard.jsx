// frontend/src/components/Dashboard/AISuggestionCard.tsx
import React from 'react';
import styles from './AISuggestionCard.module.css';
import { FaMagic } from 'react-icons/fa'; // Or your chosen AI icon

const AISuggestionCard = ({ onGetSuggestions }) => {
    return (
        <div className={styles.aiCard}>
            <div className={styles.header}>
                <h4 className={styles.title}>AI Swap Suggestions</h4>
                <FaMagic size={24} className={styles.icon} />
            </div>
            <p className={styles.description}>Discover new swap opportunities!</p>
            <button
                onClick={onGetSuggestions}
                className={`btn btn-light-text-green ${styles.cardButton}`}
            >
                Get Suggestions
            </button>
        </div>
    );
};

export default AISuggestionCard;