// frontend/src/components/Profile/UserListings.jsx
import React, { useState, useEffect } from 'react';
import ItemCard from '../Item/ItemCard';
import Spinner from '../common/Spinner';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { List } from 'lucide-react';

// Mock API or import actual API: e.g., import { getUserItems } from '../../api/itemApi';
const mockGetUserItems = async (userId) => {
  console.log("Fetching items for user:", userId);
  await new Promise(resolve => setTimeout(resolve, 500));
  // Return some mock items, ensure they have _id
  return [
    // { _id: 'itemX', title: 'My Special Lamp', category: 'home-goods', condition: 'good', images: ['...'] },
    // { _id: 'itemY', title: 'My Favorite Book', category: 'books', condition: 'like-new', images: ['...'] },
  ];
};


const UserListings = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userItems = await mockGetUserItems(userId); // Replace with actual API call
        setItems(userItems);
      } catch (err) {
        setError(err.message || "Failed to fetch user's items.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [userId]);

  if (isLoading) return <div className="flex justify-center py-6"><Spinner /></div>;
  if (error) return <div className="text-red-600 p-4 text-center">{error}</div>;

  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <List className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">You haven't listed any items yet.</p>
        <Button asChild className="mt-6">
          <Link to="/list-item">List an Item</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {items.map(item => (
        <ItemCard key={item._id} item={item} />
        // TODO: Add Edit/Delete buttons or options to ItemCard for owned items
      ))}
    </div>
  );
};

export default UserListings;