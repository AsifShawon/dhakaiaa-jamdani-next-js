// src/app/product/[id]/page.tsx
"use client";
import { Metadata } from "next";
import Breadcrumbs from "@/app/components/product/breadcrumbs";
import { fetchProducts } from "@/app/slices/productSlices";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, ArrowLeft, Star, Info, Check, X, Heart, MessageCircle } from "lucide-react";
import { addToCart, addToFavorites } from "@/app/slices/cartSlice";
import { User } from "@supabase/supabase-js";
import { getUserData } from "@/app/auth/getUser";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import React from 'react'; // Explicitly import React
import DetailedDescription from "@/app/components/product/detailedDescription";

const Page = () => {
  const [data, setData] = useState<User | null>(null);
  const { favorites } = useSelector((state: any) => state.cart);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showFavPrompt, setShowFavPrompt] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  const whatsappNumbers = [
    "8801322902540", "8801322902541", "8801322902542", "8801322902543",
    "8801322902544", "8801322902545", "8801322902546", "8801322902548",
    "8801322902549"
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setData(user);
    };
    fetchUser();
  }, []);

  const dispatch = useDispatch();
  const params = useParams();
  const id = Number(params.id);
  const [imageIndex, setImageIndex] = useState(0);
  const { products, status, error } = useSelector(
    (state: any) => state.products
  );
  const product = products?.find((product: any) => product.id === id);
  const isFavorite = favorites.includes(product?.id);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    if (!data) {
      setShowLoginPrompt(true);
      return;
    }
    setRating(index + 1);
  };

  const handleAddToCart = () => {
    // if (!data) {
    //   setShowCartPrompt(true);
    //   return;
    // }
    
    setIsAddingToCart(true);
    dispatch(addToCart(product));
    
    // Show success feedback
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleAddToFavorites = () => {
    if (!data) {
      setShowFavPrompt(true);
      return;
    }

    dispatch(addToFavorites(product));
  };


  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  useEffect(() => {
    if (product?.rating) {
      setRating(product.rating);
    }
  }, [product]);

  // Generate JSON-LD for product
  const generateProductJsonLd = (product: any) => {
    if (!product) return null;

    const discountedPrice = product.price - (product.price * product.discount) / 100;
    
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title,
      "description": product.description,
      "image": product.image_urls,
      "brand": {
        "@type": "Brand",
        "name": "Dhakaia Jamdani"
      },
      "category": product.category,
      "sku": `DJ-${product.id}`,
      "offers": {
        "@type": "Offer",
        "price": discountedPrice.toFixed(2),
        "priceCurrency": "BDT",
        "availability": product.availability === "in-stock" 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Dhakaia Jamdani"
        },
        "url": `https://dhakaiaajamdani.com/product/${product.id}`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating || 4.5,
        "reviewCount": Math.floor(Math.random() * 100) + 10
      }
    };
  };

  // Generate breadcrumb JSON-LD
  const generateBreadcrumbJsonLd = (product: any) => {
    if (!product) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dhakaiaajamdani.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Shop",
          "item": "https://dhakaiaajamdani.com/Shop"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": product.category,
          "item": `https://dhakaiaajamdani.com/Shop?category=${product.category}`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": product.title,
          "item": `https://dhakaiaajamdani.com/product/${product.id}`
        }
      ]
    };
  };

  if (status === "loading" || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <p className="text-xl font-medium">Error: {error}</p>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <>
      <Head>
        <title>{product.title} | Dhakaia Jamdani - Traditional Bangladeshi Clothing</title>
        <meta name="description" content={`${product.description} - Premium quality ${product.category} from Dhakaia Jamdani. Authentic traditional Bangladeshi clothing with cultural heritage.`} />
        <meta name="keywords" content={`${product.title}, ${product.category}, Bangladeshi ${product.category}, traditional clothing, Dhakaia Jamdani`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.title} | Dhakaia Jamdani`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image_urls[0]} />
        <meta property="og:url" content={`https://dhakaiaajamdani.com/product/${product.id}`} />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.title} | Dhakaia Jamdani`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image_urls[0]} />
        
        {/* Product specific meta */}
        <meta property="product:price:amount" content={discountedPrice.toFixed(2)} />
        <meta property="product:price:currency" content="BDT" />
        <meta property="product:availability" content={product.availability} />
        <meta property="product:category" content={product.category} />
        
        <link rel="canonical" href={`https://dhakaiaajamdani.com/product/${product.id}`} />
      </Head>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductJsonLd(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbJsonLd(product)) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 pt-16 lg:pt-20 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Breadcrumbs category={product.category} title={product.title} />
            </motion.div>
            
            <hr className="my-6 border-gray-200 dark:border-gray-700" />

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/Shop"
                className="inline-flex items-center text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors mb-8 font-medium group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to shop
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden lg:grid lg:grid-cols-2 gap-12"
            >
              {/* Image Section */}
              <div className="relative p-8 lg:p-12">
                {/* Main Showcase Image */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="aspect-square relative rounded-2xl overflow-hidden bg-white dark:bg-gray-700 shadow-xl"
                >
                  <Image
                    src={product.image_urls[imageIndex]}
                    alt={product.title}
                    className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      transition={{ delay: 0.8 }}
                      className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg"
                    >
                      -{product.discount}% OFF
                    </motion.div>
                  )}
                </motion.div>

                {/* Thumbnails Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-4 mt-8"
                >
                  {product.image_urls.map((image: string, index: number) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setImageIndex(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                        index === imageIndex 
                          ? "ring-4 ring-red-500 shadow-lg scale-105" 
                          : "hover:shadow-md opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        sizes="80px"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Product Details Section */}
              <div className="p-8 lg:p-12 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-4"
                >
                  <Link
                    href={`/Shop?category=${product.category}`}
                    className="inline-block px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    {product.category}
                  </Link>
                  
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    {product.title}
                  </h1>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleClick(index)}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="focus:outline-none"
                          aria-label={`Rate ${index + 1} stars`}
                        >
                          <Star
                            className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
                              index < (hoverRating ?? rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">({rating})</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap items-end gap-6"
                >
                  <div className="flex items-baseline bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 px-6 py-4 rounded-2xl">
                    <p className="text-2xl text-red-500 font-bold">৳</p>
                    <p className="text-4xl lg:text-5xl font-bold text-red-500 ml-1">
                      {discountedPrice.toFixed(2)}
                    </p>
                  </div>

                  {product.discount > 0 && (
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-red-500 flex items-center">
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg text-sm">
                          Save ৳{(product.price - discountedPrice).toFixed(2)}
                        </span>
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 line-through text-lg">
                        ৳{product.price.toFixed(2)}
                      </p>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-center gap-3"
                >
                  {product.availability === "in-stock" ? (
                    <div className="flex items-center text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      In Stock
                    </div> 
                  ) : (
                    <div className="flex items-center text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      Out of Stock 
                    </div>
                  )}
                  {/* WhatsApp Button */}
                  <button
                    type="button"
                    onClick={() => setShowWhatsappModal(true)}
                    className="ml-3 flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="border-t border-gray-200 dark:border-gray-700 pt-6"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={product.availability !== "in-stock" || isAddingToCart}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      product.availability !== "in-stock" || isAddingToCart
                        ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        Add to cart
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToFavorites}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isFavorite
                        ? "bg-red-500 text-white shadow-lg"
                        : "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Remove" : "Favorite"}
                  </motion.button>
                </motion.div>
                
                {!data && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl"
                  >
                    <Info className="w-5 h-5 mr-3 flex-shrink-0" />
                    <p className="text-sm">Sign in to save items to your favorites and enable cart functionality</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Detailed Description Section */}
            {product.detailed_desc && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <DetailedDescription description={product.detailed_desc} />
              </motion.div>
            )}

          </div>
        </div>
        
        {/* Login Prompt Modal for Rating */}
        <AnimatePresence>
          {showLoginPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sign in to rate this product</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in or create an account to rate products and track your preferences.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/login" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                    <Link href="/Signup" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 px-6 rounded-xl font-medium transition-all"
                      >
                        Create Account
                      </motion.button>
                    </Link>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowLoginPrompt(false)}
                    className="w-full mt-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 py-2 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Favorites Prompt Modal */}
        <AnimatePresence>
          {showFavPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sign in to add your Favourite Items</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in or create an account to add items to your favourites.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/login" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                    <Link href="/Signup" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 px-6 rounded-xl font-medium transition-all"
                      >
                        Create Account
                      </motion.button>
                    </Link>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowFavPrompt(false)}
                    className="w-full mt-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 py-2 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Modal */}
        <AnimatePresence>
          {showWhatsappModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contact via WhatsApp</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Click a number below to chat with us on WhatsApp:</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {whatsappNumbers.map((num) => (
                      <a
                        key={num}
                        href={`https://wa.me/${num}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        +{num}
                      </a>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowWhatsappModal(false)}
                    className="w-full mt-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 py-2 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Page;