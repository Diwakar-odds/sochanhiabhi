// frontend/src/components/Profile/UserProfileDetails.jsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Mail, MapPin } from 'lucide-react';

const UserProfileDetails = ({ user }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24 border-2 border-primary text-4xl">
          <AvatarImage src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'U')}&size=96`} alt={user.username} />
          <AvatarFallback>{(user.username || 'U').charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold">{user.username}</h2>
          <p className="text-muted-foreground flex items-center mt-1">
            <Mail className="h-4 w-4 mr-2" /> {user.email}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">Bio</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          {user.bio || 'No bio provided.'}
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
        <p className="text-sm text-gray-700 flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          {user.location?.city || user.location || 'Location not set.'}
        </p>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default UserProfileDetails;