"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import LeftBar from "./LeftBar";

// Define props interface
interface TopBarProps {
  onSortChange?: (sortOption: string) => void;
}

const TopBar = ({ onSortChange }: TopBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

    // Sort options mapping
    const sortOptions = [
      { value: "default", label: "Default Sorting" },
      { value: "priceHighToLow", label: "Price [High to Low]" },
      { value: "priceLowToHigh", label: "Price [Low to High]" },
      { value: "rating", label: "Rating" }
    ];
  
  // Get current sort from URL or default to "Default Sorting"
  const currentSort = searchParams.get("sort") || "default";
  const [sortOption, setSortOption] = useState(getSortLabel(currentSort));
  
  // Convert sort value to display label
  function getSortLabel(value: string): string {
    const option = sortOptions.find(opt => opt.value === value);
    return option ? option.label : "Default Sorting";
  }

  // Handle sort option change
  const handleSortOptionClick = (value: string, label: string) => {
    setSortOption(label);
    setIsOpen(false);
    
    if (onSortChange) {
      onSortChange(value);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('sort-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between">
      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-sm btn-outline">
              <SlidersHorizontal size={18} className="mr-1" />
              Filters
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-2 pr-10 pt-24">
              <LeftBar />
            </ul>
          </div>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div id="sort-dropdown" className="relative text-left ml-auto flex items-center">
        <p className="text-sm font-medium mr-3">Sort By:</p>
        
        <div className="relative">
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-base-100 px-3 py-2 text-sm font-medium text-base-content border border-base-300 hover:bg-base-200 transition-colors"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            {sortOption}
            <ChevronDown 
              className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-base-100 shadow-lg ring-1 ring-base-300 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-base-200 transition-colors ${
                      option.value === currentSort ? 'text-primary font-medium' : 'text-base-content'
                    }`}
                    role="menuitem"
                    onClick={() => handleSortOptionClick(option.value, option.label)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;