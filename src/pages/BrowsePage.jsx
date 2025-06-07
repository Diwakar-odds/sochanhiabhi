// Can be moved to a constants file or fetched from backend
export const ITEM_CATEGORIES = ["All Categories", "Electronics", "Clothing", "Books", "Home Goods", "Toys", "Sports", "Tools", "Plants", "Other"];
export const ITEM_CONDITIONS = ["All Conditions", "New", "Like New", "Good", "Fair", "Poor"];
// For API: "all" might be represented by omitting the filter param.
// The value for "All Categories" should be handled appropriately when making API calls.

// e.g., "all" for UI, but don't send "category=all" to API.

// frontend/src/pages/BrowsePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { getItems } from '../api/itemApi'; // Assuming you have this function
import ItemCard from '../components/Item/ItemCard';
import styles from './BrowsePage.module.css'; // We'll create this

const BrowsePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Add state for search term, filters etc. later
    // const [searchTerm, setSearchTerm] = useState('');

    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getItems(); // Your API call
            setItems(data || []); // Ensure items is an array even if data is null/undefined
        } catch (err) {
            setError(err.message || 'Failed to fetch items. Please try again later.');
            setItems([]); // Clear items on error
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <h2 className={styles.pageTitle}>Browse Swap Items</h2>
                <div className={styles.loadingMessage}>Loading items...</div>
                {/* You can add a spinner component here */}
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <h2 className={styles.pageTitle}>Browse Swap Items</h2>
                <div className={`alert alert-danger ${styles.errorMessage}`}>{error}</div>
                <button onClick={fetchItems} className="btn btn-primary-green">Try Again</button>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <h2 className={styles.pageTitle}>Browse Swap Items</h2>
            {/* TODO: Add Search Bar and Filters section here later */}
            {/* <div className={styles.filtersContainer}> ... </div> */}

            {items.length === 0 && !loading ? (
                <div className={styles.noItemsMessage}>
                    No items available for swap at the moment. Check back soon!
                </div>
            ) : (
                <div className={styles.itemsGrid}>
                    {items.map(item => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrowsePage;