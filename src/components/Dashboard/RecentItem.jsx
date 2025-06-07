// frontend/src/components/Dashboard/RecentItem.tsx
import React from 'react';
import styles from './RecentItem.module.css';

const RecentItem = ({ title, category, imageUrl }) => {
    return (
        <div className={styles.recentItem}>
            <img src={imageUrl} alt={title} className={styles.itemImage} />
            <div className={styles.itemDetails}>
                <h6 className={styles.itemTitle}>{title}</h6>
                <p className={styles.itemCategory}>{category}</p>
            </div>
        </div>
    );
};

export default RecentItem;