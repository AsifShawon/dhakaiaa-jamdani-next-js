"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/app/context/ThemeContext';
import clsx from 'clsx';
import { Package, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

interface Order {
  id: number;
  created_at: string;
  status: string;
  total: number;
  Order_info: any;
}

interface RecentOrdersProps {
  orders: Order[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  const { theme } = useTheme();

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className={clsx("w-12 h-12 mx-auto mb-4", {
          "text-gray-300": theme === "light",
          "text-gray-600": theme === "dark"
        })} />
        <p className={clsx("text-gray-500", {
          "text-gray-400": theme === "dark"
        })}>
          No recent orders
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={clsx("p-4 rounded-lg border transition-all duration-200 hover:shadow-md", {
            "bg-gray-50 border-gray-200 hover:bg-gray-100": theme === "light",
            "bg-gray-700 border-gray-600 hover:bg-gray-600": theme === "dark"
          })}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {getStatusIcon(order.status)}
              <div>
                <h4 className={clsx("font-semibold", {
                  "text-gray-900": theme === "light",
                  "text-white": theme === "dark"
                })}>
                  Order #{order.id}
                </h4>
                <p className={clsx("text-sm", {
                  "text-gray-600": theme === "light",
                  "text-gray-400": theme === "dark"
                })}>
                  {order.Order_info?.firstName} {order.Order_info?.lastName}
                </p>
                <p className={clsx("text-xs", {
                  "text-gray-500": theme === "light",
                  "text-gray-400": theme === "dark"
                })}>
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={clsx("font-bold", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark"
              })}>
                ৳{order.total.toFixed(2)}
              </span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecentOrders;