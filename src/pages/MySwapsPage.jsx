// frontend/src/pages/MySwapsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path
import { SwapProposalCard } from '../components/Swap/SwapProposalCard.jsx'; // Adjust path
import { Card, CardContent } from '../components/ui/card'; // Adjust path
import { Button } from '../components/ui/button.tsx'; // Adjust path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"; // Adjust path
import { Repeat, ThumbsUp, ThumbsDown } from 'lucide-react'; // Icons

// Simple AppHeader placeholder
const AppHeader = ({ pageTitle }) => (
  <div className="mb-4 md:mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{pageTitle}</h1>
  </div>
);


// --- Mock API (Replace with actual backend integration) ---
// Assuming backend returns proposals with populated user and item details
const mockUser = (id, name) => ({ _id: id, username: name, email: `${name.toLowerCase()}@example.com` });
const mockItem = (id, title, userId, images = ['https://via.placeholder.com/60x60.png?text=Item']) => ({ _id: id, title, owner: userId, images });

let mockProposalsData = [
  { _id: 'prop1', proposer: mockUser('user2', 'Bob'), receiver: mockUser('user1', 'Alice'), proposerItem: mockItem('itemB', 'Bob\'s Lamp', 'user2'), receiverItem: mockItem('itemA', 'Alice\'s Vase', 'user1'), status: 'pending', message: 'Interested in your vase!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { _id: 'prop2', proposer: mockUser('user1', 'Alice'), receiver: mockUser('user3', 'Charlie'), proposerItem: mockItem('itemC', 'Alice\'s Book', 'user1'), receiverItem: mockItem('itemD', 'Charlie\'s Game', 'user3'), status: 'accepted', message: 'Let\'s trade.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { _id: 'prop3', proposer: mockUser('user4', 'David'), receiver: mockUser('user1', 'Alice'), proposerItem: mockItem('itemE', 'David\'s Hat', 'user4'), receiverItem: mockItem('itemF', 'Alice\'s Scarf', 'user1'), status: 'declined', message: 'Can I offer this hat?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
];

const mockFetchProposals = async (userId, type) => { // type: 'incoming' or 'outgoing'
  console.log(`Mock API: Fetching ${type} proposals for user ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  if (type === 'incoming') {
    return mockProposalsData.filter(p => p.receiver._id === userId);
  } else {
    return mockProposalsData.filter(p => p.proposer._id === userId);
  }
};
// --- End Mock API ---


export default function MySwapsPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [incomingProposals, setIncomingProposals] = useState([]);
  const [outgoingProposals, setOutgoingProposals] = useState([]);
  const [isLoadingIncoming, setIsLoadingIncoming] = useState(true);
  const [isLoadingOutgoing, setIsLoadingOutgoing] = useState(true);
  const [activeTab, setActiveTab] = useState("incoming");

  const fetchProposalsData = useCallback(async () => {
    if (!currentUser?._id) return;

    setIsLoadingIncoming(true);
    mockFetchProposals(currentUser._id, 'incoming')
      .then(setIncomingProposals)
      .catch(err => console.error("Error fetching incoming proposals:", err))
      .finally(() => setIsLoadingIncoming(false));

    setIsLoadingOutgoing(true);
    mockFetchProposals(currentUser._id, 'outgoing')
      .then(setOutgoingProposals)
      .catch(err => console.error("Error fetching outgoing proposals:", err))
      .finally(() => setIsLoadingOutgoing(false));
  }, [currentUser]);

  useEffect(() => {
    fetchProposalsData();
  }, [fetchProposalsData]);

  const handleProposalActionSuccess = (proposalId, newStatus) => {
    // Re-fetch or update local state. For simplicity, re-fetch all for now.
    // A more optimized approach would be to update only the specific proposal in the local state.
    console.log(`Proposal ${proposalId} updated to ${newStatus}. Refreshing lists.`);
    fetchProposalsData();
  };


  if (authLoading) return <div className="p-4 text-center">Loading user data...</div>;
  if (!currentUser) { navigate('/login'); return null; } // Should be handled by ProtectedRoute

  const renderProposalList = (proposals, perspective, isLoading) => {
    if (isLoading) return <p className="p-4 text-center text-muted-foreground">Loading proposals...</p>;
    if (proposals.length === 0) {
      return (
        <Card className="text-center py-10 md:py-12">
          <CardContent className="flex flex-col items-center">
            <Repeat className="mx-auto h-10 w-10 md:h-12 md:w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {perspective === 'receiver' ? 'No incoming swap proposals.' : 'You haven\'t made any proposals yet.'}
            </p>
            {perspective === 'proposer' && (
              <Button onClick={() => navigate('/browse')} className="mt-4">Browse Items to Swap</Button>
            )}
          </CardContent>
        </Card>
      );
    }
    return (
      <div className="space-y-4">
        {proposals.map(p => (
          <SwapProposalCard
            key={p._id}
            proposal={p}
            perspective={perspective}
            currentUserId={currentUser._id}
            onActionSuccess={handleProposalActionSuccess}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6">
      <AppHeader pageTitle="My Swaps" />
      <Tabs defaultValue="incoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">Incoming ({isLoadingIncoming ? '...' : incomingProposals.length})</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing ({isLoadingOutgoing ? '...' : outgoingProposals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="mt-4">
          {renderProposalList(incomingProposals, 'receiver', isLoadingIncoming)}
        </TabsContent>

        <TabsContent value="outgoing" className="mt-4">
          {renderProposalList(outgoingProposals, 'proposer', isLoadingOutgoing)}
        </TabsContent>
      </Tabs>
    </div>
  );
}