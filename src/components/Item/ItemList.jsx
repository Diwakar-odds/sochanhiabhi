// frontend/src/components/Item/ItemList.jsx
import React from 'react';
import ItemCard from './ItemCard'; // Your custom ItemCard
import Spinner from '../common/Spinner';

const ItemList = ({ items, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-600 bg-red-100 border border-red-300 rounded-md">{error}</div>;
  }

  if (!items || items.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No items found matching your criteria.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;