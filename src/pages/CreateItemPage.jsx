"use client";

import { ItemForm } from '@/components/items/item-form';
import { AppHeader } from '@/components/layout/sidebar-nav';

export default function NewItemPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <AppHeader pageTitle="List a New Item" />
      <ItemForm />
    </div>
  );
}
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ItemCard } from '@/components/item-card';
import type { Item } from '@/types';
import { mockItems, itemCategories, itemConditions } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/layout/sidebar-nav';
import { ListFilter, Search, XSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'relevance'>('date-desc');
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Simulate fetching items
    setItems(mockItems);
  }, []);


  const filteredItems = useMemo(() => {
    let tempItems = [...items];

    if (searchTerm) {
      tempItems = tempItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      tempItems = tempItems.filter(item => item.category === selectedCategory);
    }

    if (selectedCondition !== 'all') {
      tempItems = tempItems.filter(item => item.condition === selectedCondition);
    }

    // Sorting logic
    if (sortBy === 'date-desc') {
      tempItems.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
    } else if (sortBy === 'date-asc') {
      tempItems.sort((a, b) => new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime());
    }
    // 'relevance' sorting would typically be handled by a search backend

    return tempItems;
  }, [items, searchTerm, selectedCategory, selectedCondition, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSortBy('date-desc');
  };

  return (
    <div className="flex flex-col gap-6">
      <AppHeader pageTitle="Browse Items" />
      
      <div className="p-4 bg-card rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {itemCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              {itemConditions.map(condition => (
                <SelectItem key={condition} value={condition} className="capitalize">{condition}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <ListFilter className="mr-2 h-4 w-4" /> Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'date-desc'}
                  onCheckedChange={() => setSortBy('date-desc')}
                >
                  Date Listed (Newest)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'date-asc'}
                  onCheckedChange={() => setSortBy('date-asc')}
                >
                  Date Listed (Oldest)
                </DropdownMenuCheckboxItem>
                {/* Relevance might be disabled if not supported by backend */}
                <DropdownMenuCheckboxItem
                  checked={sortBy === 'relevance'}
                  onCheckedChange={() => setSortBy('relevance')}
                  disabled 
                >
                  Relevance (Coming Soon)
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={resetFilters} size="icon" aria-label="Reset filters">
                <XSquare className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Items Found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters. Or perhaps list an item yourself!
          </p>
          <Button asChild className="mt-6">
            <a href="/items/new">List an Item</a>
          </Button>
        </div>
      )}
    </div>
  );
}
