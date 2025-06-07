// frontend/src/components/Item/ItemFilter.jsx
import React, { useState } from 'react';
import { Input } from '../ui/input'; // shadcn/ui
import { Button } from '../ui/button'; // shadcn/ui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'; // shadcn/ui
import { Search, X } from 'lucide-react';

const ItemFilter = ({ onFilterChange, categories = [], conditions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

  const handleSearch = () => {
    onFilterChange({ searchTerm, category: selectedCategory, condition: selectedCondition });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCondition('');
    onFilterChange({ searchTerm: '', category: '', condition: '' });
  };

  return (
    <div className="p-4 mb-6 bg-card rounded-lg shadow space-y-4 md:space-y-0 md:flex md:items-end md:gap-4">
      <div className="flex-grow">
        <label htmlFor="searchTerm" className="block text-sm font-medium text-muted-foreground mb-1">Search Items</label>
        <Input
          id="searchTerm"
          type="text"
          placeholder="Keywords (e.g., 'vintage lamp', 'kids bicycle')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      {categories.length > 0 && (
        <div className="md:w-1/4">
          <label htmlFor="category" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.value || cat} value={cat.value || cat}>
                  {cat.label || cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {conditions.length > 0 && (
         <div className="md:w-1/4">
          <label htmlFor="condition" className="block text-sm font-medium text-muted-foreground mb-1">Condition</label>
          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger id="condition">
              <SelectValue placeholder="All Conditions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Conditions</SelectItem>
              {conditions.map(cond => (
                <SelectItem key={cond.value || cond} value={cond.value || cond}>
                  {cond.label || cond}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex gap-2 pt-4 md:pt-0">
        <Button onClick={handleSearch}><Search className="mr-2 h-4 w-4" /> Search</Button>
        <Button onClick={handleReset} variant="outline"><X className="mr-2 h-4 w-4" /> Reset</Button>
      </div>
    </div>
  );
};

export default ItemFilter;