"use client";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import AdvancedFilters from "../components/ShopPage/AdvancedFilters";
import TopBar from "../components/ShopPage/TopBar";
import { useDispatch } from "react-redux";
import { fetchProducts, setFilters } from "@/app/slices/productSlices";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ShopLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [currentSort, setCurrentSort] = useState("default");

  useEffect(() => {
    dispatch(fetchProducts() as any);
    
    const category = searchParams.getAll('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.getAll('availability');
    const rating = searchParams.getAll('rating');
    const search = searchParams.get('search');
    
    const filters = {
      category: category.length > 0 ? category : [],
      minPrice: minPrice ? parseInt(minPrice) : 0,
      maxPrice: maxPrice ? parseInt(maxPrice) : 10000,
      availability: availability.length > 0 ? availability : [],
      rating: rating.map(r => parseInt(r)),
      search: search || "",
    };
    
    dispatch(setFilters(filters));
  }, [dispatch, searchParams]);

  const handleSortChange = (sortOption: string) => {
    setCurrentSort(sortOption);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortOption);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src="/images/Do-Shopping.png"
          alt="Shop Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-white text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover <span className="text-red-400">Authentic</span> Heritage
          </h1>
          <p className="text-lg md:text-xl max-w-2xl px-4">
            Explore our curated collection of traditional Bangladeshi craftsmanship
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block flex-shrink-0">
            <div className="sticky top-24">
              <AdvancedFilters />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Mobile Filters */}
            <div className="lg:hidden">
              <AdvancedFilters />
            </div>
            
            {/* Top Bar */}
            <Suspense fallback={<div>Loading filters...</div>}>
              <TopBar onSortChange={handleSortChange} />
            </Suspense>
            
            {/* Products */}
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading shop...</p>
        </div>
      </div>
    }>
      <ShopLayoutContent>{children}</ShopLayoutContent>
    </Suspense>
  );
};

export default ShopLayout;