import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'; // Adjust path if using @/ alias
import { Button } from '../ui/button'; // Adjust path if using @/ alias
import { Badge } from '../ui/badge';   // Adjust path if using @/ alias
// Icons (ensure lucide-react is installed: npm install lucide-react)
import { ArrowRight, Check, X } from 'lucide-react';
import { toast } from "sonner"; // Import Sonner's toast directly

// Mock API call (replace with actual API call)
// Example: import { updateProposalStatus } from '../../api/proposalApi';
const mockUpdateProposalStatus = async (proposalId, status) => {
  console.log(`Mock API: Updating proposal ${proposalId} to ${status}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, backend would return the full updated proposal or at least success/failure
  return { success: true, updatedProposal: { _id: proposalId, status } }; // Simulate success
};


// Helper sub-component for displaying item details within the card
const ItemDisplay = ({ item, user, isOfferedByCurrentUser }) => {
  if (!item || !user) return <div className="text-sm text-muted-foreground p-2">Item or user details missing.</div>;
  
  // Ensure item._id exists before creating a link to prevent errors with undefined IDs
  const itemLink = item._id ? `/item/${item._id}` : '#';
  const placeholderImage = 'https://via.placeholder.com/60x60.png?text=N/A';
  // Ensure item.images is an array and has at least one image before accessing images[0]
  const displayImage = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : placeholderImage;

  return (
    <Link to={itemLink} className="block hover:bg-muted p-2 rounded-md transition-colors">
      <div className="flex items-center gap-3">
        <img 
          src={displayImage} 
          alt={item.title || 'Item image'} 
          width={60} 
          height={60} 
          className="rounded-md aspect-square object-cover bg-gray-200" // Added bg for placeholder
        />
        <div>
          <p className="font-semibold text-sm line-clamp-2">{item.title || "Untitled Item"}</p>
          <p className="text-xs text-muted-foreground">
            Listed by: {isOfferedByCurrentUser ? "You" : user.username || "Unknown User"}
          </p>
        </div>
      </div>
    </Link>
  );
};


function SwapProposalCard({ proposal, perspective, currentUserId, onActionSuccess }) {
  // Removed: const { toast } = useToast(); // No longer using the old shadcn/ui useToast hook
  const navigate = useNavigate();

  // Destructure with defaults to prevent errors if any part of the proposal is missing
  const {
    proposer = { username: 'Unknown', _id: null },
    receiver = { username: 'Unknown', _id: null },
    proposerItem = { title: 'N/A', images: [], _id: null },
    receiverItem = { title: 'N/A', images: [], _id: null },
    message = '',
    status = 'unknown',
    _id: proposalId,
    createdAt = new Date().toISOString() // Default to now if createdAt is missing
  } = proposal || {}; // Ensure proposal itself is not null/undefined

  // Early return if essential IDs are missing after destructuring with defaults
  if (!proposalId || !proposer._id || !receiver._id || !proposerItem._id || !receiverItem._id) {
    return (
      <Card>
        <CardContent className="p-4">
          Error: Incomplete or invalid proposal data.
        </CardContent>
      </Card>
    );
  }

  const handleAction = async (action) => {
    try {
      // const result = await updateProposalStatus(proposalId, action); // REAL API CALL
      const result = await mockUpdateProposalStatus(proposalId, action); // MOCK API CALL
      
      if (result.success) {
        toast.success(`Proposal ${action === 'accepted' ? 'Accepted' : 'Declined'}`, {
          description: "The proposal status has been updated successfully.",
          // You can add actions to Sonner toasts if needed
          // action: { label: "View", onClick: () => navigate(`/proposals/${proposalId}`) }
        });
        if (onActionSuccess) {
          onActionSuccess(proposalId, result.updatedProposal.status || action); // Pass the new status
        }
      } else {
        toast.error("Action Failed", {
          description: "Could not update the proposal status. Please try again."
        });
      }
    } catch (error) {
      toast.error("An Error Occurred", {
        description: error.message || "An unexpected error occurred while updating the proposal."
      });
      console.error(`Error ${action}ing proposal ${proposalId}:`, error);
    }
  };

  const isCurrentUserProposer = perspective === 'proposer' || (currentUserId && proposer._id === currentUserId);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg truncate">
          {isCurrentUserProposer ? `Your proposal to ${receiver.username}` : `Proposal from ${proposer.username}`}
        </CardTitle>
        <CardDescription className="flex items-center flex-wrap text-xs">
          Status:
          <Badge
            variant={status === 'pending' ? 'secondary' : (status === 'accepted' ? 'default' : 'destructive')}
            className="capitalize ml-1.5 mr-2 px-2 py-0.5" // Adjusted padding for Badge
          >
            {status}
          </Badge>
          <span className="text-muted-foreground">| On: {new Date(createdAt).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-around gap-3 md:gap-4">
          <div className="w-full md:flex-1 border p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {isCurrentUserProposer ? "You Offered:" : `${proposer.username} Offered:`}
            </p>
            <ItemDisplay item={proposerItem} user={proposer} isOfferedByCurrentUser={isCurrentUserProposer} />
          </div>
          <div className="flex justify-center items-center my-2 md:my-0">
            <ArrowRight className="h-5 w-5 text-primary transform md:rotate-0 rotate-90" />
          </div>
          <div className="w-full md:flex-1 border p-2 rounded-md bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {isCurrentUserProposer ? `For ${receiver.username}'s Item:` : "For Your Item:"}
            </p>
            <ItemDisplay item={receiverItem} user={receiver} isOfferedByCurrentUser={!isCurrentUserProposer} />
          </div>
        </div>
        {message && (
          <div className="p-3 bg-muted/50 rounded-md mt-3"> {/* Slightly less prominent bg for message */}
            <p className="text-sm font-semibold mb-0.5">Message:</p>
            <p className="text-sm text-muted-foreground italic">"{message}"</p>
          </div>
        )}
      </CardContent>
      {perspective === 'receiver' && status === 'pending' && currentUserId === receiver._id && (
        <CardFooter className="flex justify-end gap-2 pt-3">
          <Button variant="outline" size="sm" onClick={() => handleAction('declined')}>
            <X className="mr-1.5 h-4 w-4" /> Decline
          </Button>
          <Button size="sm" onClick={() => handleAction('accepted')}>
            <Check className="mr-1.5 h-4 w-4" /> Accept
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export { SwapProposalCard };