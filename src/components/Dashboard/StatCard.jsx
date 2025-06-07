// frontend/src/components/Dashboard/StatCard.tsx
import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ title, count, description, buttonText, onButtonClick, icon, buttonClass, buttonDisabled }) => {
    return (
        <div className={`${styles.statCard} dashboard-card`}> {/* Using global dashboard-card for base */}
            <div className={styles.header}>
                <h4 className={styles.title}>{title}</h4>
                {icon && <div className={styles.iconWrapper}>{icon}</div>}
            </div>
            <div className={styles.count}>{count}</div>
            <p className={styles.description}>{description}</p>
            {buttonText && (
                <button
                    onClick={onButtonClick}
                    className={`btn ${buttonClass || 'btn-primary-green'} ${styles.cardButton}`}
                    disabled={buttonDisabled}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};

export default StatCard;