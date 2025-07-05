"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  removeFromCart,
  clearCart,
  initializeFromStorage,
  syncCart,
  incrementQuantity,
  decrementQuantity,
} from "@/app/slices/cartSlice";
import { fetchProducts } from "@/app/slices/productSlices";
import { Product } from "@/app/slices/productSlices";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { AppDispatch, RootState } from "../store/store";
import Image from "next/image";

export default function FloatingCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { products, status } = useSelector((state: any) => state.products);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    dispatch(initializeFromStorage());
    if (!products || products.length === 0) {
      dispatch(fetchProducts() as any);
    }
  }, [dispatch, products]);

  if (!isMounted) return null;

  if (status === "loading" || !products) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-[100]"
      >
        <div 
          className="relative bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg"
          data-cart-trigger
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
          />
        </div>
      </motion.div>
    );
  }

  const cartItems = Array.isArray(cart) 
    ? cart
        .map((item: { id: number; quantity: number }) => {
          const product = products?.find((p: Product) => p.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean)
    : [];

  const totalPrice = cartItems.reduce(
    (total: number, item: any) =>
      total + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const totalItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);

  return (
    <>
      {/* Cart Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-[100]"
      >
        <motion.button
          onClick={() => setCartOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
          data-cart-trigger
        >
          <ShoppingCart className="w-6 h-6" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-white text-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150]"
            onClick={() => setCartOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-[200] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  <div>
                    <h2 className="text-xl font-bold">Shopping Cart</h2>
                    <p className="text-red-100 text-sm">{totalItems} items</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-auto">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-8"
                >
                  <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-center text-sm mb-6">
                    Discover our amazing products and add them to your cart
                  </p>
                  <Link href="/Shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCartOpen(false)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Start Shopping
                    </motion.button>
                  </Link>
                </motion.div>
              ) : (
                <div className="p-4 space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item: any, index: number) => {
                      if (!item || !item.id) return null;

                      const discountedPrice = item.price - (item.price * (item.discount || 0)) / 100;

                      return (
                        <motion.div
                          key={`cart-item-${item.id}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                              <Image
                                src={item.image_urls?.[0] || "/default-placeholder.png"}
                                alt={item.title || "Product image"}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                {item.title || "Unnamed product"}
                              </h3>
                              
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-red-500 font-bold">
                                  ৳{(discountedPrice * item.quantity).toFixed(2)}
                                </span>
                                {item.discount > 0 && (
                                  <span className="text-xs text-gray-500 line-through">
                                    ৳{(item.price * item.quantity).toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => dispatch(decrementQuantity(item.id))}
                                    className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </motion.button>
                                  
                                  <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                    {item.quantity}
                                  </span>
                                  
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => dispatch(incrementQuantity(item.id))}
                                    className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </motion.button>
                                </div>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => dispatch(removeFromCart(item.id))}
                                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>৳{totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <Link href="/checkout" className="block">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCartOpen(false)}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
                      >
                        Proceed to Checkout
                      </motion.button>
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        dispatch(clearCart());
                        dispatch(syncCart());
                      }}
                      className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Clear Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}