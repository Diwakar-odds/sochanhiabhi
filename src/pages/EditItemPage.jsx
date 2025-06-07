"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ItemForm } from '@/components/items/item-form';
import { AppHeader } from '@/components/layout/sidebar-nav';
import type { Item } from '@/types';
import { mockItems } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function EditItemPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, isLoading: authLoading } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      router.replace('/login');
      return;
    }

    if (params.id) {
      const foundItem = mockItems.find(i => i.id === params.id);
      if (foundItem) {
        if (foundItem.userId !== currentUser.id) {
          // Not the owner, redirect
          toast({ title: "Unauthorized", description: "You can only edit your own items.", variant: "destructive" });
          router.replace(`/items/${params.id}`);
          return;
        }
        setItem(foundItem);
      } else {
        // Item not found
        toast({ title: "Not Found", description: "Item could not be found.", variant: "destructive" });
        router.replace('/items');
        return;
      }
    }
    setIsLoading(false);
  }, [params.id, router, currentUser, authLoading]);


  if (isLoading || authLoading || !item) {
    return (
      <div className="max-w-2xl mx-auto">
        <AppHeader pageTitle="Loading Item for Edit..." />
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const handleSave = (updatedItem: Item) => {
    // This function would typically be handled by API.
    // For mock data, ItemForm already updates mockItems if onSave is not provided.
    // Or, we can update it here explicitly if ItemForm's onSave is used.
    const index = mockItems.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      mockItems[index] = updatedItem;
    }
    router.push(`/items/${updatedItem.id}`);
  };


  return (
    <div className="max-w-2xl mx-auto">
       <AppHeader pageTitle={`Edit: ${item.name}`} />
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      <ItemForm item={item} onSave={handleSave} />
    </div>
  );
}

// Minimal toast for this page as it's part of edit flow.
// Full useToast is available.
const toast = ({ title, description, variant }: { title: string, description: string, variant?: "default" | "destructive" }) => {
  console.log(`Toast (${variant || 'default'}): ${title} - ${description}`);
  // In a real app, this would call useToast().toast(...)
};
