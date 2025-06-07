// frontend/src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

// Assuming AuthContext provides: user, token, loading, and a way to updateUser (or refetch)
import { useAuth } from '../contexts/AuthContext'; // Adjust path if needed

// Shadcn/ui components (assuming setup via `npx shadcn-ui@latest add ...`)
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'; // Adjust path
import { Button } from '../components/ui/button'; // Adjust path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'; // Adjust path
import { Input } from '../components/ui/input'; // Adjust path
import { Label } from '../components/ui/label'; // Adjust path
import { Textarea } from '../components/ui/textarea'; // Adjust path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"; // Adjust path
import { useToast } from '../components/ui/use-toast'; // Adjust path, ensure Toaster is in App.jsx

// Icons from lucide-react (or react-icons if you prefer)
// npm install lucide-react
import { Edit3, Mail, MapPin, User as UserIcon, Save, List } from 'lucide-react';

// Your custom components
import ItemCard from '../components/Item/ItemCard'; // Adjust path

// API functions (you'll need to create these)
// Example: import { updateUserProfile, getUserItems } from '../api/userApi';
// For now, we'll mock the API calls

// Mock API call (replace with actual API calls)
const mockUpdateUserProfile = async (userId, userData) => {
  console.log("Mock API: Updating user", userId, userData);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  // In a real app, the backend would return the updated user or success status
  return { ...userData, id: userId, email: "user@example.com" }; // Return merged data for demo
};

const mockGetUserItems = async (userId) => {
  console.log("Mock API: Fetching items for user", userId);
  await new Promise(resolve => setTimeout(resolve, 500));
  // Simulate fetching items, replace with actual API call
  const allMockItems = [ /* Populate with some mock item objects */
    { _id: 'item1', title: 'Old Book', category: 'books', condition: 'good', images: ['https://via.placeholder.com/150'], owner: userId },
    { _id: 'item2', title: 'Vintage Shirt', category: 'clothing', condition: 'fair', images: ['https://via.placeholder.com/150'], owner: userId },
  ];
  return allMockItems.filter(item => item.owner === userId);
};


// Simple AppHeader placeholder
const AppHeader = ({ pageTitle }) => (
  <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
  </div>
);


export default function ProfilePage() {
  const { user: currentUser, loading: authLoading, token, fetchCurrentUser } = useAuth(); // Assuming fetchCurrentUser can refresh user state
  const navigate = useNavigate();
  const { toast } = useToast(); // Make sure <Toaster /> is in your App.jsx or MainLayout.jsx

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: '', // Our AuthContext uses 'username'
    bio: '',
    location: '',
    profileImage: '', // Our AuthContext might use 'profileImage'
  });
  const [userItems, setUserItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setEditedUser({
        username: currentUser.username || '',
        bio: currentUser.bio || '', // Add bio to your backend User model if needed
        location: currentUser.location?.city || currentUser.location || '', // Adapt based on your user model
        profileImage: currentUser.profileImage || '',
      });

      // Fetch user's items
      const loadUserItems = async () => {
        setItemsLoading(true);
        try {
          // const items = await getUserItems(currentUser._id); // REAL API CALL
          const items = await mockGetUserItems(currentUser._id); // MOCK API CALL
          setUserItems(items);
        } catch (error) {
          toast({ variant: "destructive", title: "Error", description: "Could not fetch your items." });
          console.error("Error fetching user items:", error);
        } finally {
          setItemsLoading(false);
        }
      };
      loadUserItems();
    }
  }, [currentUser, toast]);

  // This handles the case where the page is accessed directly or useAuth() is still initializing
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading profile...</div> {/* Or a spinner component */}
      </div>
    );
  }

  // If not loading and still no user, redirect to login (ProtectedRoute usually handles this)
  if (!currentUser) {
    // This case should ideally be handled by ProtectedRoute, but as a fallback:
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!currentUser?._id) {
        toast({ variant: "destructive", title: "Error", description: "User not found." });
        return;
    }
    setProfileUpdateLoading(true);
    try {
      // const updatedUserDataFromApi = await updateUserProfile(currentUser._id, editedUser); // REAL API CALL
      await mockUpdateUserProfile(currentUser._id, editedUser); // MOCK API CALL

      // After successful backend update, refresh the user data in AuthContext
      // The best way is if your AuthContext has a method like `updateUserContext(newUserData)`
      // Or, refetch the user data:
      await fetchCurrentUser(); // This should update `currentUser` from AuthContext

      setIsEditing(false);
      toast({ title: "Profile Updated", description: "Your profile information has been saved." });
    } catch (error) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message || "Could not update profile." });
      console.error("Profile update error:", error);
    } finally {
      setProfileUpdateLoading(false);
    }
  };


  return (
    <div className="flex flex-col gap-6 p-4 md:p-6"> {/* Added padding */}
      <AppHeader pageTitle="My Profile" />
      <Card className="shadow-lg"> {/* Shadcn card usually doesn't need explicit shadow-xl */}
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary"> {/* `border-primary` uses Tailwind theme color */}
              <AvatarImage src={editedUser.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username || 'U')}&background=random`} alt={currentUser.username} />
              <AvatarFallback>{(currentUser.username || 'U').charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                <Input name="username" value={editedUser.username} onChange={handleInputChange} className="text-2xl font-bold mb-1" disabled={profileUpdateLoading}/>
              ) : (
                <CardTitle className="text-3xl">{currentUser.username}</CardTitle>
              )}
              <div className="flex items-center text-muted-foreground mt-1">
                <Mail className="h-4 w-4 mr-2" /> {currentUser.email}
              </div>
            </div>
          </div>
          {isEditing ? (
            <Button onClick={handleSaveProfile} size="sm" disabled={profileUpdateLoading}>
              <Save className="mr-2 h-4 w-4"/>
              {profileUpdateLoading ? "Saving..." : "Save Changes"}
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm"><Edit3 className="mr-2 h-4 w-4"/>Edit Profile</Button>
          )}
        </CardHeader>
        <CardContent className="mt-6 space-y-6"> {/* Increased spacing */}
          <div>
            <Label htmlFor="bio" className="text-sm font-medium text-muted-foreground">Bio</Label>
            {isEditing ? (
              <Textarea id="bio" name="bio" value={editedUser.bio} onChange={handleInputChange} placeholder="Tell us about yourself..." className="mt-1" disabled={profileUpdateLoading}/>
            ) : (
              <p className="mt-1 text-sm text-gray-700">{currentUser.bio || 'No bio provided. Click "Edit Profile" to add one.'}</p>
            )}
          </div>
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-muted-foreground">Location</Label>
            {isEditing ? (
              <Input id="location" name="location" value={editedUser.location} onChange={handleInputChange} placeholder="Your City, Country" className="mt-1" disabled={profileUpdateLoading}/>
            ) : (
              <p className="mt-1 flex items-center text-sm text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-primary"/>
                {currentUser.location?.city || currentUser.location || 'Location not set.'}
              </p>
            )}
          </div>
          {isEditing && (
             <div>
                <Label htmlFor="profileImage" className="text-sm font-medium text-muted-foreground">Avatar URL</Label>
                 <Input id="profileImage" name="profileImage" value={editedUser.profileImage} onChange={handleInputChange} placeholder="https://example.com/avatar.png" className="mt-1" disabled={profileUpdateLoading}/>
             </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="my-items" className="w-full mt-4"> {/* Added margin top */}
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3"> {/* Adapted for potentially fewer tabs initially */}
          <TabsTrigger value="my-items">My Listed Items ({userItems.length})</TabsTrigger>
          <TabsTrigger value="swap-history" disabled>Swap History (Soon)</TabsTrigger>
          {/* <TabsTrigger value="wishlist" disabled>Wishlist (Soon)</TabsTrigger> */}
        </TabsList>

        <TabsContent value="my-items" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Listed Items</CardTitle>
              <CardDescription>Items you have put up for swap.</CardDescription>
            </CardHeader>
            <CardContent>
              {itemsLoading ? (
                <p>Loading your items...</p> /* Or a skeleton loader */
              ) : userItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"> {/* Adjusted gap */}
                  {userItems.map(item => <ItemCard key={item._id} item={item} />)}
                </div>
              ) : (
                <div className="text-center py-10">
                  <List className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't listed any items yet.</p>
                  <Button onClick={() => navigate('/list-item')} className="mt-6">List an Item</Button> {/* Changed from asChild a to onClick navigate */}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Add other TabsContent placeholders here if needed */}
      </Tabs>
    </div>
  );
}