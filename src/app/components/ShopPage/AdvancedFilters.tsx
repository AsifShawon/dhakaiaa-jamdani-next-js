"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Star, ChevronDown, ChevronUp } from "lucide-react";
import DualRangeSlider from "./DualRangeSlider";

const AdvancedFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the current search params
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    availability: true,
  });

  const categories = ["Sharee", "Panjabi", "Threepcs"];
  const ratings = [5, 4, 3, 2, 1];

  // Modified createQueryString
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString()); // Start with existing params

      if (name === "category" || name === "availability" || name === "rating") {
        const values = params.getAll(name);
        if (values.includes(value)) {
          // If value exists, remove it
          params.delete(name); // Delete all instances first
          values
            .filter((val) => val !== value)
            .forEach((val) => params.append(name, val)); // Then append back the ones that remain
        } else {
          // If value doesn't exist, add it
          params.append(name, value);
        }
      } else {
        // For single-value parameters like minPrice, maxPrice, search
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name); // Remove if value is empty
        }
      }

      // Reset page to 1 when a filter changes (optional but good UX)
      params.set("page", "1"); 

      return params.toString();
    },
    [searchParams] // Dependency on searchParams to ensure it uses the latest URL state
  );

  const clearAllFilters = () => {
    router.push("/Shop");
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const activeFiltersCount = 
    searchParams.getAll("category").length +
    searchParams.getAll("availability").length +
    searchParams.getAll("rating").length +
    (searchParams.get("minPrice") ? 1 : 0) +
    (searchParams.get("maxPrice") ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 shadow-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block w-80 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
          {activeFiltersCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllFilters}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Clear All
            </motion.button>
          )}
        </div>

        <FilterContent 
          categories={categories}
          ratings={ratings}
          createQueryString={createQueryString}
          searchParams={searchParams}
          router={router}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
        />
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <FilterContent 
                  categories={categories}
                  ratings={ratings}
                  createQueryString={createQueryString}
                  searchParams={searchParams}
                  router={router}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                />

                <div className="mt-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearAllFilters}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded-lg font-medium"
                  >
                    Clear All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium"
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const FilterContent = ({ 
  categories, 
  ratings, 
  createQueryString, 
  searchParams, 
  router,
  expandedSections,
  toggleSection 
}: any) => {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">Category</h3>
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-2"
            >
              {categories.map((category: string) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={searchParams.getAll("category").includes(category)}
                    onChange={() => {
                      router.push("?" + createQueryString("category", category));
                    }}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range Filter */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">Price Range</h3>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3"
            >
              <DualRangeSlider />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating Filter */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">Rating</h3>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.rating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-2"
            >
              {ratings.map((rating: number) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={searchParams.getAll("rating").includes(rating.toString())}
                    onChange={() => {
                      router.push("?" + createQueryString("rating", rating.toString()));
                    }}
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      & up
                    </span>
                  </div>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Availability Filter */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">Availability</h3>
          {expandedSections.availability ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.availability && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 space-y-2"
            >
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("availability").includes("in-stock")}
                  onChange={() => {
                    router.push("?" + createQueryString("availability", "in-stock"));
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors">
                  In Stock
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={searchParams.getAll("availability").includes("out-of-stock")}
                  onChange={() => {
                    router.push("?" + createQueryString("availability", "out-of-stock"));
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-500 transition-colors">
                  Out of Stock
                </span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedFilters;