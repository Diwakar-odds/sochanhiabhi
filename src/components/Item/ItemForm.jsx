// frontend/src/components/Item/ItemForm.tsx
import React, { useState } from 'react';
import styles from './ItemForm.module.css'; // We'll create this

const ItemForm = ({ onSubmit, initialData = {}, isLoading = false, submitButtonText = "Submit Item" }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [condition, setCondition] = useState(initialData.condition || '');
    // For images, simple text input for URLs for now. Real upload is more complex.
    const [imageUrls, setImageUrls] = useState(initialData.imageUrls?.join(', ') || '');
    const [desiredSwaps, setDesiredSwaps] = useState(initialData.desiredSwaps || '');

    const itemCategories = ["Electronics", "Clothing", "Books", "Home Goods", "Toys", "Sports", "Tools", "Plants", "Other"];
    const itemConditions = ["New", "Like New", "Good", "Fair", "Poor"];

    const handleSubmit = (e) => {
        e.preventDefault();
        const itemData = {
            title,
            description,
            category,
            condition,
            images: imageUrls.split(',').map(url => url.trim()).filter(url => url), // Basic parsing
            desiredSwaps,
        };
        onSubmit(itemData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.itemForm}>
            <div className="form-group">
                <label htmlFor="title">Item Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isLoading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    required
                    disabled={isLoading}
                />
            </div>

            <div className={styles.formRow}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        disabled={isLoading}
                    >
                        <option value="" disabled>Select a category</option>
                        {itemCategories.map(cat => (
                            <option key={cat} value={cat.toLowerCase().replace(' ', '-')}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <select
                        id="condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                        disabled={isLoading}
                    >
                        <option value="" disabled>Select condition</option>
                        {itemConditions.map(cond => (
                            <option key={cond} value={cond.toLowerCase().replace(' ', '-')}>{cond}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="imageUrls">Image URLs (comma-separated)</label>
                <input
                    type="text"
                    id="imageUrls"
                    value={imageUrls}
                    onChange={(e) => setImageUrls(e.target.value)}
                    placeholder="e.g., https://example.com/image1.jpg, ..."
                    disabled={isLoading}
                />
                <small>For multiple images, separate URLs with a comma. Actual file upload coming soon!</small>
            </div>

            <div className="form-group">
                <label htmlFor="desiredSwaps">Desired Swap Items/Categories (Optional)</label>
                <input
                    type="text"
                    id="desiredSwaps"
                    value={desiredSwaps}
                    onChange={(e) => setDesiredSwaps(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            <button type="submit" className="btn btn-primary-green btn-block" disabled={isLoading}>
                {isLoading ? 'Submitting...' : submitButtonText}
            </button>
        </form>
    );
};

export default ItemForm;