"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Bell,
  Plus,
  Eye,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  User
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/app/context/ThemeContext";
import clsx from "clsx";
import AnalyticsChart from "@/app/components/Admin/AnalyticsChart";
import RecentOrders from "@/app/components/Admin/RecentOrders";
import NotificationCenter from "@/app/components/Admin/NotificationCenter";
import { fetchDashboardStats, fetchNotifications } from "./action";
import { useAdminAuth } from "@/app/hooks/useAdminAuth";

// Type definitions
interface Product {
  id: string;
  name: string;
  sales: number;
}

interface Order {
  id: number;
  created_at: string;
  status: string;
  total: number;
  Order_info: any;
}

interface MonthlyData {
  month: string;
  value: number;
}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  monthlyRevenue: MonthlyData[];
  orderTrends: MonthlyData[];
  topProducts: Product[];
}

const Dashboard = () => {
  const { theme } = useTheme();
  const { profile, user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    monthlyRevenue: [],
    orderTrends: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, notificationsData] = await Promise.all([
          fetchDashboardStats(),
          fetchNotifications()
        ]);
        setStats(statsData);
        setNotifications(notificationsData);
        setUnreadCount(notificationsData.length);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const cardClasses = clsx(
    "rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl",
    {
      "bg-white border-gray-200": theme === "light",
      "bg-gray-800 border-gray-700": theme === "dark",
    }
  );

  const statCards = [
    {
      title: "Total Revenue",
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      change: "+12.5%",
      changeType: "increase"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      change: "+8.2%",
      changeType: "increase"
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      change: "+3.1%",
      changeType: "increase"
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      change: "+15.3%",
      changeType: "increase"
    }
  ];

  const quickActions = [
    {
      title: "Add New Product",
      description: "Add a new product to your inventory",
      href: "/Admin/AddProduct",
      icon: Plus,
      color: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      title: "View All Products",
      description: "Manage your product catalog",
      href: "/Admin/AllProducts",
      icon: Package,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      title: "Manage Orders",
      description: "Process and track customer orders",
      href: "/Admin/Orders",
      icon: ShoppingCart,
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      title: "Notifications",
      description: `View and manage admin notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`,
      href: "/Admin/Notifications",
      icon: Bell,
      color: unreadCount > 0 
        ? "bg-gradient-to-r from-red-500 to-pink-500" 
        : "bg-gradient-to-r from-gray-500 to-gray-600",
      hasNotification: unreadCount > 0,
      notificationCount: unreadCount
    },
    {
      title: "Manage Offers",
      description: "Create and manage promotional offers",
      href: "/Admin/Offers",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className={clsx("min-h-screen transition-colors duration-300", {
      "bg-gray-50": theme === "light",
      "bg-gray-900": theme === "dark",
    })}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className={clsx("text-3xl md:text-4xl font-bold", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                Admin Dashboard
              </h1>
              <p className={clsx("text-lg mt-2", {
                "text-gray-600": theme === "light",
                "text-gray-400": theme === "dark",
              })}>
                Welcome back! Here&apos;s what&apos;s happening with your store.
              </p>
            </div>
            <NotificationCenter />
          </div>
        </motion.div>

        {/* Admin Info Section */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className={clsx("rounded-xl p-6 border", {
              "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200": theme === "light",
              "bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-800": theme === "dark",
            })}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className={clsx("text-xl font-semibold", {
                    "text-gray-900": theme === "light",
                    "text-white": theme === "dark",
                  })}>
                    Welcome, {profile.firstname} {profile.lastname}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium capitalize">
                      {profile.role}
                    </span>
                    <span className={clsx("text-sm", {
                      "text-gray-500": theme === "light",
                      "text-gray-400": theme === "dark",
                    })}>
                      • Logged in as {user?.email}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={clsx("text-sm", {
                    "text-gray-600": theme === "light",
                    "text-gray-400": theme === "dark",
                  })}>
                    Last login
                  </p>
                  <p className={clsx("text-sm font-medium", {
                    "text-gray-900": theme === "light",
                    "text-white": theme === "dark",
                  })}>
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={cardClasses}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={clsx("text-sm font-medium", {
                    "text-gray-600": theme === "light",
                    "text-gray-400": theme === "dark",
                  })}>
                    {stat.title}
                  </p>
                  <p className={clsx("text-2xl font-bold mt-2", {
                    "text-gray-900": theme === "light",
                    "text-white": theme === "dark",
                  })}>
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === "increase" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={clsx("text-sm font-medium", {
                      "text-green-600": stat.changeType === "increase",
                      "text-red-600": stat.changeType === "decrease"
                    })}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={clsx("p-3 rounded-full", stat.bgColor)}>
                  <stat.icon className={clsx("w-6 h-6", stat.color)} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts and Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <div className={cardClasses}>
            <h3 className={clsx("text-xl font-bold mb-4", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              Revenue Analytics
            </h3>
            <AnalyticsChart data={stats.monthlyRevenue} type="revenue" />
          </div>
          
          <div className={cardClasses}>
            <h3 className={clsx("text-xl font-bold mb-4", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              Order Trends
            </h3>
            <AnalyticsChart data={stats.orderTrends} type="orders" />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className={clsx("text-2xl font-bold mb-6", {
            "text-gray-900": theme === "light",
            "text-white": theme === "dark",
          })}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <Link href={action.href}>
                  <div className={clsx("p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl cursor-pointer", {
                    "bg-white border-gray-200 hover:border-gray-300": theme === "light",
                    "bg-gray-800 border-gray-700 hover:border-gray-600": theme === "dark",
                    "ring-2 ring-red-500 ring-opacity-50": action.hasNotification && theme === "light",
                    "ring-2 ring-red-400 ring-opacity-50": action.hasNotification && theme === "dark",
                  })}>
                    <div className={clsx("w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative", action.color)}>
                      <action.icon className="w-6 h-6 text-white" />
                      {action.hasNotification && action.notificationCount && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                          {action.notificationCount > 99 ? '99+' : action.notificationCount}
                        </span>
                      )}
                    </div>
                    <h3 className={clsx("text-lg font-semibold mb-2", {
                      "text-gray-900": theme === "light",
                      "text-white": theme === "dark",
                    })}>
                      {action.title}
                    </h3>
                    <p className={clsx("text-sm", {
                      "text-gray-600": theme === "light",
                      "text-gray-400": theme === "dark",
                    })}>
                      {action.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={cardClasses}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={clsx("text-2xl font-bold", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              Recent Orders
            </h2>
            <Link href="/Admin/Orders">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
              >
                <Eye className="w-4 h-4" />
                View All
              </motion.button>
            </Link>
          </div>
          <RecentOrders orders={stats.recentOrders} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;