// frontend/src/pages/BrowsePage.tsx
import React, { useState, useEffect } from 'react';
import { getItems } from '../api/itemApi'; // API function to fetch items
import ItemCard from '../components/Item/ItemCard'; // We'll create/refine this component next
import styles from './BrowsePage.module.css'; // We'll create this CSS module

const BrowsePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // TODO: Add states for search term, filters (category, condition, location), sorting

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedItems = await getItems(); // Call your API function
                setItems(fetchedItems || []); // Ensure items is an array
            } catch (err) {
                setError(err.message || 'Failed to fetch items. Please try again later.');
                setItems([]); // Clear items on error
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []); // Empty dependency array to run once on mount

    // Placeholder for search/filter handlers
    const handleSearch = (searchTerm) => {
        console.log('Searching for:', searchTerm);
        // TODO: Implement search logic (client-side or server-side)
    };

    const handleFilterChange = (filterType, value) => {
        console.log('Filter changed:', filterType, value);
        // TODO: Implement filter logic
    };

    return (
        <div className={styles.browsePageContainer}>
            <h2 className={styles.pageTitle}>Browse Swap Items</h2>

            {/* Placeholder for Search Bar and Filters - We'll build these as separate components */}
            <div className={styles.controlsContainer}>
                <div className={styles.searchBarPlaceholder}>
                    {/* <SearchBar onSearch={handleSearch} /> */}
                    <input type="text" placeholder="Search items..." className={styles.searchInput} onChange={(e) => handleSearch(e.target.value)} />
                </div>
                <div className={styles.filtersPlaceholder}>
                    {/* <Filters onFilterChange={handleFilterChange} /> */}
                    <select className={styles.filterSelect} onChange={(e) => handleFilterChange('category', e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        {/* Add more categories */}
                    </select>
                    <select className={styles.filterSelect} onChange={(e) => handleFilterChange('condition', e.target.value)}>
                        <option value="">All Conditions</option>
                        <option value="new">New</option>
                        <option value="like-new">Like New</option>
                        {/* Add more conditions */}
                    </select>
                </div>
            </div>

            {loading && <div className={styles.loadingState}>Loading items...</div>}
            {error && <div className={`alert alert-danger ${styles.errorState}`}>{error}</div>}

            {!loading && !error && items.length === 0 && (
                <div className={styles.noItemsState}>No items found. Try adjusting your search or filters, or check back later!</div>
            )}

            {!loading && !error && items.length > 0 && (
                <div className={styles.itemsGrid}>
                    {items.map((item) => (
                        <ItemCard key={item._id || item.id} item={item} />
                    ))}
                </div>
            )}

            {/* Placeholder for Pagination */}
            {/* {!loading && items.length > 0 && <Pagination />} */}
        </div>
    );
};

export default BrowsePage;