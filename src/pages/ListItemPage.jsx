// frontend/src/pages/ListItemPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../components/Item/ItemForm';
import { createItem } from '../api/itemApi';
import styles from './ListItemPage.module.css';

const ListItemPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleCreateItem = async (itemData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const newItem = await createItem(itemData);
            setSuccess(`Item "${newItem.title || 'New Item'}" listed successfully!`);
            // Clear form or redirect
            // For now, let's redirect to dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard'); // Or to a "My Listings" page or the new item's detail page
            }, 2500);
        } catch (err) {
            // err already comes as an Error object with a message property from itemApi.ts
            setError(err.message || 'An unexpected error occurred. Please try again.');
            console.error("Listing item error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.listItemPageContainer}>
            <h2 className={styles.pageTitle}>List a New Item for Swap</h2>

            {/* Container for messages to ensure consistent styling and placement */}
            <div className={styles.messagesContainer}>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {success && <div className="alert alert-success" role="alert">{success}</div>}
            </div>

            {/* Only show form if not successfully submitted, or allow multiple submissions by not hiding it */}
            {/* For this example, we keep it visible but could conditionally hide or clear it */}
            <div className="dashboard-card"> {/* Using global card style for the form wrapper */}
                <ItemForm
                    onSubmit={handleCreateItem}
                    isLoading={isLoading}
                    submitButtonText="List My Item"
                    // To clear form on success, you'd pass initialData={} and a key to ItemForm
                    // key={success ? Date.now() : 'item-form'} // This would re-mount and clear the form
                />
            </div>
        </div>
    );
};

export default ListItemPage;