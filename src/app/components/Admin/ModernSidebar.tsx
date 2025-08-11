"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3,
  LogOut,
  HeartHandshakeIcon,
  Bell,
  Shield,
  User
} from "lucide-react";
import React, { useMemo, useState, useEffect } from "react";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";

interface ModernSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { logout, profile, user } = useAdminAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = useMemo(() => [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/Admin/Dashboard",
      color: "text-blue-500"
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      href: "/Admin/Notifications",
      color: "text-red-500"
    },
    {
      id: "all-products",
      title: "All Products",
      icon: Package,
      href: "/Admin/AllProducts",
      color: "text-green-500"
    },
    {
      id: "add-product",
      title: "Add Product",
      icon: Plus,
      href: "/Admin/AddProduct",
      color: "text-purple-500"
    },
    {
      id: "orders",
      title: "Orders",
      icon: ShoppingCart,
      href: "/Admin/Orders",
      color: "text-orange-500"
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: BarChart3,
      href: "/Admin/Analytics",
      color: "text-indigo-500"
    },
    {
      id: "offers",
      title: "Offers",
      icon: HeartHandshakeIcon,
      href: "/Admin/Offers",
      color: "text-yellow-500"
    }
  ], []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={`
        w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0 z-40
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      <div className="flex flex-col h-full">
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 p-2 rounded bg-gray-100 dark:bg-gray-800"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo and Admin Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/Admin/Dashboard" className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">ঢ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Dhakaia Jamdani</p>
            </div>
          </Link>
          
          {/* Admin Profile Section */}
          {profile && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {profile.firstname} {profile.lastname}
                </p>
                <div className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-green-500" />
                  <p className="text-xs text-green-600 dark:text-green-400 capitalize">
                    {profile.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {mounted && menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? item.color : ''}`} />
                </motion.div>
                <span className="font-medium">{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-2 h-2 bg-blue-500 rounded-full ml-auto"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          {!mounted && (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex items-center space-x-3 px-4 py-3 rounded-xl">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
              ))}
            </div>
          )}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ModernSidebar;
