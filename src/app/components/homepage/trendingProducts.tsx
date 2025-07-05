"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../productCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/slices/productSlices";
import Link from "next/link";
import { motion } from "framer-motion";

const TrendingProducts = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state: any) => state.products);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any); 
    }
  }, [status, dispatch]);

  // Show only first 6 products for trending section
  const trendingProducts = products.slice(0, 6);

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Trending Products
            </span>
            <span className="text-gray-800 dark:text-gray-200"> for You!</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover our most popular traditional wear, loved by customers worldwide
          </p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"
          />
        </motion.div>

        {status === 'loading' ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        ) : status === 'failed' ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium">Error loading products: {error}</div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {trendingProducts.map((product: any, index: any) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard props={{ product }} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/Shop">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all duration-300"
            >
              Explore All Products
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block ml-2"
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-10 blur-xl"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-10 blur-2xl"
        />
      </div>
    </section>
  );
};

export default TrendingProducts;