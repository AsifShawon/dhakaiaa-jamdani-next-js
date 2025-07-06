'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern - Fixed positioning and pointer events */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ef4444%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative z-20">
            <div className="space-y-4">
              <div className="inline-block">
                {/* Logo */}
                <div className="mb-4">
                  <Image
                    src="/images/logo.png"
                    alt="Dhakaia Jamdani Logo"
                    width={220}
                    height={220}
                    priority
                  />
                </div>
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-lg font-medium">
                  Welcome to Authentic Heritage
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  ঢাকাইয়া
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-200">জামদানি</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                Discover the timeless elegance of traditional Bangladeshi craftsmanship. 
                Each piece tells a story of heritage, artistry, and cultural pride.
              </p>
            </div>

            {/* Buttons - Simplified without hydration issues */}
            <div className="absolute flex flex-col sm:flex-row gap-4 z-50">
              <Link href="/Shop" className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  Explore Collection
                </motion.button>
              </Link>
              
              <Link href="/About" className="relative hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-500 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 w-full sm:w-auto"
                >
                  Our Story
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-8 pt-8 relative z-20">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Artisans</div>
              </div>
            </div> */}
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative z-10">
            <div className="relative grid grid-cols-2 gap-6">
              {/* Main Featured Product */}
              <div className="col-span-2 relative group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/sharee_1.webp"
                    alt="Featured Sharee"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white z-30">
                    <h3 className="text-xl font-bold mb-2">Premium Jamdani Sharee</h3>
                    <Link href="/Shop?category=Sharee" className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
                      >
                        Shop Sharees
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Secondary Products */}
              <div className="relative group">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/panjabi_1.webp"
                    alt="Panjabi Collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white z-30">
                    <h4 className="font-semibold mb-1">Panjabi</h4>
                    <Link href="/Shop?category=Panjabi" className="relative">
                      <span className="text-sm hover:underline cursor-pointer">
                        Explore →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/threepcs_1.webp"
                    alt="Three Piece Collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white z-30">
                    <h4 className="font-semibold mb-1">Three Piece</h4>
                    <Link href="/Shop?category=Threepcs" className="relative">
                      <span className="text-sm hover:underline cursor-pointer">
                        Explore →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements - Behind everything */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-20 blur-xl pointer-events-none -z-10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-15 blur-2xl pointer-events-none -z-10" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Simplified */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;