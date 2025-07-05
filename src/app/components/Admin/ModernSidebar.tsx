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
  LogOut
} from "lucide-react";
import { supabase } from "@/app/utils/supabase/supabaseClient";
import React from "react";

interface ModernSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const menuItems = [
    // {
    //   title: "Dashboard",
    //   icon: LayoutDashboard,
    //   href: "/Admin/Dashboard",
    //   color: "text-blue-500"
    // },
    {
      title: "All Products",
      icon: Package,
      href: "/Admin/AllProducts",
      color: "text-green-500"
    },
    {
      title: "Add Product",
      icon: Plus,
      href: "/Admin/AddProduct",
      color: "text-purple-500"
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      href: "/Admin/Orders",
      color: "text-orange-500"
    },
    // {
    //   title: "Analytics",
    //   icon: BarChart3,
    //   href: "/Admin/Analytics",
    //   color: "text-indigo-500"
    // },
    // {
    //   title: "Customers",
    //   icon: Users,
    //   href: "/Admin/Customers",
    //   color: "text-pink-500"
    // },
    // {
    //   title: "Settings",
    //   icon: Settings,
    //   href: "/Admin/Settings",
    //   color: "text-gray-500"
    // }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
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

        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/Admin/Dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">ঢ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dhakaiaa Jamdani</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-red-500" : item.color}`} />
                  <span className="font-medium">{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-red-500 rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
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