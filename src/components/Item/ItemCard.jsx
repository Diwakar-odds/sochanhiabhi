// frontend/src/components/Item/ItemCard.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // To link to item detail page
import styles from './ItemCard.module.css';
import { FaTag, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa'; // Example icons

// A default placeholder image if no image is provided
const DEFAULT_PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x200.png?text=No+Image';

const ItemCard = ({ item }) => {
    if (!item) {
        return null; // Or some placeholder/loading state if item is undefined
    }

    // Assuming item.images is an array of URLs and we take the first one.
    // Also assuming item.location might be an object or just a string.
    const imageUrl = item.images && item.images.length > 0 ? item.images[0] : DEFAULT_PLACEHOLDER_IMAGE;
    const itemLocation = typeof item.location === 'object' ? item.location.city : item.location;

    return (
        <div className={styles.itemCard}>
            <Link to={`/item/${item._id}`} className={styles.cardLink}> {/* Assumes item has _id */}
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={item.title || 'Swap item'} className={styles.itemImage} />
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.itemTitle}>{item.title || 'Untitled Item'}</h3>
                    {item.category && (
                        <p className={styles.itemDetail}>
                            <FaTag className={styles.icon} /> Category: {item.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                    )}
                    {item.condition && (
                        <p className={styles.itemDetail}>
                            <FaInfoCircle className={styles.icon} /> Condition: {item.condition.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                    )}
                    {itemLocation && (
                         <p className={styles.itemDetail}>
                            <FaMapMarkerAlt className={styles.icon} /> Location: {itemLocation}
                        </p>
                    )}
                </div>
            </Link>
            {/* Future: Add a quick "Propose Swap" button or "Add to Wishlist" here */}
        </div>
    );
};

export default ItemCard;