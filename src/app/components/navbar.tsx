"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, Menu, User, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserProfile, userProfile } from "@/app/auth/getUser";
import { supabase } from "../utils/supabase/supabaseClient";
import ThemeToggle from "./ui/ThemeToggle";
import SearchWithAutocomplete from "./search/SearchWithAutocomplete";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

const Navbar = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const totalItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userProfile();
      setUser(userData);
    };

    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        fetchUser();
      } else {
        setUser(null);
      }
    });
  }, []);

  // Function to trigger the floating cart
  const handleCartClick = () => {
    // Trigger the floating cart by dispatching a custom event
    const cartButton = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
    if (cartButton) {
      cartButton.click();
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/Shop", label: "Shop" },
    // { href: "/", label: "About" },
    { href: "/Contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-2 sm:top-4 left-0 right-0 mx-auto w-[95%] sm:w-[92%] lg:w-11/12 max-w-8xl z-50 px-2 sm:px-0"
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200/30 dark:border-gray-700/30">
          <div className="px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 min-w-0"
          >
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image 
              src="/images/logo_sm.png" 
              alt="Dhakaia Jamdani Logo" 
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
            </div>
          <span className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent truncate">
            <span className="hidden sm:inline">ঢাকাইয়া জামদানি</span>
            <span className="sm:hidden">ঢাকাইয়া</span>
          </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:block flex-1 max-w-lg mx-8">
            <div className="flex items-center justify-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group whitespace-nowrap"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
            </Link>
          ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Search */}
            <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSearchOpen(true)}
          className="p-1.5 sm:p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Search"
            >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            {/* Theme Toggle */}
            <div className="hidden sm:block">
          <ThemeToggle size="sm" />
            </div>

            {/* Cart */}
            <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCartClick}
          className="relative p-1.5 sm:p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Shopping Cart"
            >
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold"
              >
            {totalItems > 99 ? '99+' : totalItems}
              </motion.span>
            )}
          </AnimatePresence>
            </motion.button>

            {/* User - Hidden on mobile */}
            <div className="hidden md:block">
          {user ? (
            <Link
              href={user.role === "admin" ? "/Admin/AllProducts" : "/dashboard"}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs lg:text-sm font-medium">
              {user.firstname?.[0]}
            </span>
              </div>
              <span className="text-sm font-medium truncate max-w-20 lg:max-w-none">{user.firstname}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm font-medium hidden lg:inline">Sign In</span>
            </Link>
          )}
            </div>

            {/* Mobile menu button */}
            <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 sm:p-2 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle menu"
            >
          {mobileMenuOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
            </motion.button>
          </div>
        </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200/30 dark:border-gray-700/30 bg-white/98 dark:bg-gray-900/98 backdrop-blur-sm rounded-b-xl sm:rounded-b-2xl"
          >
            <div className="px-4 sm:px-6 py-4 space-y-3">
          {/* Navigation Links */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 py-2.5 px-3 text-base font-medium transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
            {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Theme Toggle */}
          <div className="sm:hidden pt-2 border-t border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
              <ThemeToggle size="sm" />
            </div>
          </div>

          {/* User Section */}
          <div className="pt-3 border-t border-gray-200/30 dark:border-gray-700/30">
            {user ? (
              <Link
            href={user.role === "admin" ? "/Admin/AllProducts" : "/dashboard"}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 py-2.5 px-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">
                {user.firstname?.[0]}
              </span>
            </div>
            <span className="text-base font-medium">{user.firstname}</span>
              </Link>
            ) : (
              <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 py-2.5 px-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
            <User className="w-5 h-5" />
            <span className="text-base font-medium">Sign In</span>
              </Link>
            )}
          </div>
            </div>
          </motion.div>
        )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <SearchWithAutocomplete 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />

      {/* Responsive Spacer */}
      <div className="h-16 sm:h-20 lg:h-24"></div>
    </>
  );
};

export default Navbar;