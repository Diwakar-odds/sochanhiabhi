// frontend/src/components/Dashboard/QuickActionCard.tsx
import React from 'react';
import styles from './QuickActionCard.module.css';

const QuickActionCard = ({ title, description, icon, onClick }) => {
    return (
        <div className={styles.quickActionCard} onClick={onClick}>
            <div className={styles.iconWrapper}>
                {icon}
            </div>
            <div className={styles.textWrapper}>
                <h5 className={styles.title}>{title}</h5>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
};

export default QuickActionCard;