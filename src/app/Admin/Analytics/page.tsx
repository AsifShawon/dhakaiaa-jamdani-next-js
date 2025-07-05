"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import clsx from "clsx";
import AnalyticsChart from "@/app/components/Admin/AnalyticsChart";
import { fetchAnalyticsData } from "./action";

// Define types for analytics data
type MonthlyData = {
  month: string;
  value: number;
};

type CategoryData = {
  name: string;
  value: number;
};

type TopProduct = {
  id: string;
  title: string;
  price: number;
  sales: number;
  [key: string]: any;
};

type AnalyticsData = {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    revenueGrowth: number;
    orderGrowth: number;
    customerGrowth: number;
    avgOrderValue: number;
  };
  charts: {
    monthlyRevenue: MonthlyData[];
    monthlyOrders: MonthlyData[];
    categoryBreakdown: CategoryData[];
    topProducts: TopProduct[];
  };
};

const Analytics = () => {
  const { theme } = useTheme();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    overview: {
      totalRevenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
      revenueGrowth: 0,
      orderGrowth: 0,
      customerGrowth: 0,
      avgOrderValue: 0
    },
    charts: {
      monthlyRevenue: [],
      monthlyOrders: [],
      categoryBreakdown: [],
      topProducts: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("6months");

  const loadAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAnalyticsData(dateRange);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error loading analytics data:", error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

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
      value: `৳${analyticsData.overview.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      growth: analyticsData.overview.revenueGrowth,
    },
    {
      title: "Total Orders",
      value: analyticsData.overview.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      growth: analyticsData.overview.orderGrowth,
    },
    {
      title: "Total Products",
      value: analyticsData.overview.totalProducts.toLocaleString(),
      icon: Package,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      growth: 0, // Products don't have growth in this context
    },
    {
      title: "Total Customers",
      value: analyticsData.overview.totalCustomers.toLocaleString(),
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      growth: analyticsData.overview.customerGrowth,
    },
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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className={clsx("text-3xl md:text-4xl font-bold", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              Analytics Dashboard
            </h1>
            <p className={clsx("text-lg mt-2", {
              "text-gray-600": theme === "light",
              "text-gray-400": theme === "dark",
            })}>
              Comprehensive insights into your store performance
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={clsx("px-4 py-2 rounded-lg border transition-colors", {
                "bg-white border-gray-300 text-gray-900": theme === "light",
                "bg-gray-800 border-gray-600 text-white": theme === "dark"
              })}
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </motion.div>

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
                  {stat.growth !== 0 && (
                    <div className="flex items-center mt-2">
                      {stat.growth > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={clsx("text-sm font-medium", {
                        "text-green-600": stat.growth > 0,
                        "text-red-600": stat.growth < 0
                      })}>
                        {stat.growth > 0 ? '+' : ''}{stat.growth.toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                <div className={clsx("p-3 rounded-full", stat.bgColor)}>
                  <stat.icon className={clsx("w-6 h-6", stat.color)} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* Revenue Chart */}
          <div className={cardClasses}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={clsx("text-xl font-bold", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                Revenue Trends
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Monthly</span>
              </div>
            </div>
            <AnalyticsChart data={analyticsData.charts.monthlyRevenue} type="revenue" />
          </div>

          {/* Orders Chart */}
          <div className={cardClasses}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={clsx("text-xl font-bold", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                Order Trends
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Monthly</span>
              </div>
            </div>
            <AnalyticsChart data={analyticsData.charts.monthlyOrders} type="orders" />
          </div>
        </motion.div>

        {/* Additional Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Category Breakdown */}
          <div className={cardClasses}>
            <h3 className={clsx("text-xl font-bold mb-6", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              Sales by Category
            </h3>
            <div className="space-y-4">
              {analyticsData.charts.categoryBreakdown.map((category: CategoryData, index: number) => {
                const percentage = (category.value / analyticsData.overview.totalRevenue) * 100;
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={clsx("font-medium", {
                        "text-gray-900": theme === "light",
                        "text-white": theme === "dark",
                      })}>
                        {category.name}
                      </span>
                      <span className={clsx("text-sm", {
                        "text-gray-600": theme === "light",
                        "text-gray-400": theme === "dark",
                      })}>
                        ৳{category.value.toLocaleString()} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Products */}
          <div className={cardClasses}>
            <h3 className={clsx("text-xl font-bold mb-6", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              Top Selling Products
            </h3>
            <div className="space-y-4">
              {analyticsData.charts.topProducts.map((product: TopProduct, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold", {
                      "bg-red-500 text-white": index === 0,
                      "bg-orange-500 text-white": index === 1,
                      "bg-yellow-500 text-white": index === 2,
                      "bg-gray-400 text-white": index > 2
                    })}>
                      {index + 1}
                    </div>
                    <div>
                      <p className={clsx("font-medium", {
                        "text-gray-900": theme === "light",
                        "text-white": theme === "dark",
                      })}>
                        {product.title}
                      </p>
                      <p className={clsx("text-sm", {
                        "text-gray-600": theme === "light",
                        "text-gray-400": theme === "dark",
                      })}>
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <span className={clsx("font-bold", {
                    "text-gray-900": theme === "light",
                    "text-white": theme === "dark",
                  })}>
                    ৳{(product.price * product.sales).toLocaleString()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;