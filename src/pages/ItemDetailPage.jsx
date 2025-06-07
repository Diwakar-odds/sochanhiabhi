"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import type { Item, User } from '@/types';
import { mockItems, mockUsers } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AppHeader } from '@/components/layout/sidebar-nav';
import { ArrowLeft, MapPin, MessageSquare, Repeat, ShieldCheck, Tag, User as UserIcon, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';

// Placeholder for Swap Proposal Dialog/Form
function ProposeSwapDialog({ item, owner }: { item: Item, owner: User }) {
  const [isOpen, setIsOpen] = useState(false);
  // In a real app, this would involve selecting your items to offer
  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="w-full" disabled={item.status !== 'available'}>
        <Repeat className="mr-2 h-4 w-4" /> Propose Swap
      </Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Propose Swap for {item.name}</CardTitle>
              <CardDescription>Offer an item to swap with {owner.name}.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Swap proposal functionality coming soon!</p>
              <p className="mt-2 text-sm">You would typically select one of your items to offer here.</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button disabled>Send Proposal</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}


export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [owner, setOwner] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      const foundItem = mockItems.find(i => i.id === params.id);
      if (foundItem) {
        setItem(foundItem);
        const foundOwner = mockUsers.find(u => u.id === foundItem.userId);
        setOwner(foundOwner || null);
      } else {
        // Handle item not found, maybe redirect or show error
        router.push('/items'); 
      }
    }
    setIsLoading(false);
  }, [params.id, router]);

  if (isLoading || !item || !owner) {
    return (
      <div className="flex flex-col gap-6">
        <AppHeader pageTitle="Loading Item..." />
        <div className="container mx-auto max-w-4xl py-8 px-4">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="w-full aspect-video rounded-lg mb-4" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="w-20 h-20 rounded" />)}
              </div>
            </div>
            <div>
              <Skeleton className="h-8 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/4 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = currentUser?.id === owner.id;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);


  return (
    <div className="flex flex-col gap-2">
      <AppHeader pageTitle={item.name} />
      <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-2 self-start ml-0 md:ml-0">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Items
      </Button>
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {/* Image Gallery Column */}
        <div className="md:col-span-2">
          <Card className="shadow-xl overflow-hidden">
            <div className="relative w-full aspect-[16/10] bg-muted">
              <Image
                src={item.images[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="contain"
                className="transition-opacity duration-300"
                data-ai-hint="product detail"
              />
              {item.images.length > 1 && (
                <>
                  <Button size="icon" variant="ghost" onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m9 18 6-6-6-6"/></svg>
                  </Button>
                </>
              )}
            </div>
            {item.images.length > 1 && (
              <div className="p-2 flex gap-2 overflow-x-auto bg-card-foreground/5">
                {item.images.map((imgSrc, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden shrink-0 border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`}
                  >
                    <Image src={imgSrc} alt={`Thumbnail ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="product thumbnail"/>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Details and Actions Column */}
        <div className="md:col-span-1">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
              {item.status !== 'available' && (
                 <Badge variant={item.status === 'swapped' ? 'default' : 'secondary'} className="capitalize mt-1 w-fit">
                  Status: {item.status}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-1 text-muted-foreground">Description</h3>
                <p className="text-foreground">{item.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground flex items-center"><Tag className="h-4 w-4 mr-1.5 text-primary" />Category</p>
                  <p className="font-medium">{item.category}</p>
                </div>
                <div>
                  <p className="text-muted-foreground flex items-center"><ShieldCheck className="h-4 w-4 mr-1.5 text-primary" />Condition</p>
                  <p className="font-medium capitalize">{item.condition}</p>
                </div>
                <div>
                  <p className="text-muted-foreground flex items-center"><MapPin className="h-4 w-4 mr-1.5 text-primary" />Location</p>
                  <p className="font-medium">{item.location}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground flex items-center"><UserIcon className="h-4 w-4 mr-1.5 text-primary" />Listed by</p>
                  <Link href={`/profile/${owner.id}`} className="font-medium text-primary hover:underline flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={owner.avatarUrl} alt={owner.name} data-ai-hint="user avatar"/>
                      <AvatarFallback>{owner.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    {owner.name}
                  </Link>
                </div>
              </div>
               <div>
                <h3 className="font-semibold text-sm mb-1 text-muted-foreground">Desired Swap Items</h3>
                <p className="text-foreground">{item.desiredSwapItems}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Listed on: {new Date(item.listedDate).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              {isOwner ? (
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/items/${item.id}/edit`}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Item
                  </Link>
                </Button>
              ) : (
                <>
                  <ProposeSwapDialog item={item} owner={owner} />
                  <Button variant="outline" className="w-full" disabled>
                    <MessageSquare className="mr-2 h-4 w-4" /> Message Owner (Soon)
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
