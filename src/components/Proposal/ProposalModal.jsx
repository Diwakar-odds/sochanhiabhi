// frontend/src/components/Proposal/ProposalModal.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose, // If you want an explicit close button in footer
} from '../ui/dialog'; // shadcn/ui
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'; // For selecting item to offer

const ProposalModal = ({ isOpen, onClose, receiverItem, userItems = [], onSubmit, isLoading }) => {
  const [message, setMessage] = useState('');
  const [selectedProposerItemId, setSelectedProposerItemId] = useState('');

  const handleSubmit = () => {
    if (!selectedProposerItemId) {
        alert("Please select an item you want to offer."); // Or use toast
        return;
    }
    onSubmit({
      // receiverId: receiverItem.owner, // Assuming receiverItem has owner ID
      // receiverItemId: receiverItem._id,
      proposerItemId: selectedProposerItemId,
      message,
    });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}> {/* onOpenChange can be used for close */}
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Propose a Swap</DialogTitle>
          <DialogDescription>
            Offer one of your items in exchange for "{receiverItem?.title || 'this item'}".
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="proposerItem">Your Item to Offer:</Label>
            <Select value={selectedProposerItemId} onValueChange={setSelectedProposerItemId} disabled={isLoading}>
                <SelectTrigger id="proposerItem">
                    <SelectValue placeholder="Select an item you own" />
                </SelectTrigger>
                <SelectContent>
                    {userItems.length > 0 ? (
                        userItems.map(item => (
                            <SelectItem key={item._id} value={item._id}>{item.title}</SelectItem>
                        ))
                    ) : (
                        <div className="p-4 text-sm text-muted-foreground">You have no items listed to offer.</div>
                    )}
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional):</Label>
            <Textarea
              id="message"
              placeholder="Type your message to the item owner..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isLoading || !selectedProposerItemId}>
            {isLoading ? 'Sending...' : 'Send Proposal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalModal;