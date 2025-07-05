import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { addToCart, addToFavorites, syncCart, syncFavorites } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store/store";

const ProductCard = ({ props }: { props: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { product } = props;
  const { favorites } = useSelector((state: any) => state.cart);
  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [isLiked, setIsLiked] = useState(favorites.includes(product.id));
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToFavorites = async () => {
    setIsLiked(!isLiked);
    dispatch(addToFavorites(product));
    await dispatch(syncFavorites()).unwrap();
  };
  
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    dispatch(addToCart(product));
    await dispatch(syncCart()).unwrap();
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
      onMouseEnter={() => setShowSecondImage(true)}
      onMouseLeave={() => setShowSecondImage(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-gray-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={showSecondImage ? 'second' : 'first'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={product.image_urls[showSecondImage ? 1 : 0] || product.image_urls[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToFavorites}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  <Link
    href={`/product/${encodeURIComponent(product.id)}`}
    className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
               text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white 
               transition-all duration-200 flex items-center justify-center"
    aria-label="View product details"
  >
    <Eye className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
  </Link>
</motion.div>
          </div>

          {/* Quick Add to Cart */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-red-500 hover:text-white disabled:opacity-50"
          >
            <div className="flex items-center justify-center gap-2">
              {isAddingToCart ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </div>
          </motion.button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: -12 }}
              className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg"
            >
              -{product.discount}%
            </motion.div>
          )}
          
          {product.availability === 'out-of-stock' && (
            <div className="bg-gray-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              Out of Stock
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-red-500 dark:text-red-400 uppercase tracking-wide">
            {product.category}
          </span>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {product.rating || '4.5'}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/product/${encodeURIComponent(product.id)}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ৳{discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ৳{product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button - Mobile */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.availability === 'out-of-stock'}
          className="md:hidden w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isAddingToCart ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
          {isAddingToCart ? 'Adding...' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;