"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import clsx from 'clsx';
import { fetchNotifications, markNotificationAsRead } from '@/app/Admin/Dashboard/action';

interface Notification {
  id: string;
  type: 'order' | 'product' | 'system';
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

const NotificationCenter: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
    
    // Set up real-time subscription for new notifications
    const interval = setInterval(loadNotifications, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-5 h-5 text-blue-500" />;
      case 'product':
        return <Package className="w-5 h-5 text-green-500" />;
      case 'system':
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx("relative p-3 rounded-full transition-colors", {
          "bg-gray-100 hover:bg-gray-200": theme === "light",
          "bg-gray-800 hover:bg-gray-700": theme === "dark"
        })}
      >
        <Bell className={clsx("w-6 h-6", {
          "text-gray-600": theme === "light",
          "text-gray-300": theme === "dark"
        })} />
        
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={clsx("absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-2xl border z-50", {
                "bg-white border-gray-200": theme === "light",
                "bg-gray-800 border-gray-700": theme === "dark"
              })}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className={clsx("text-lg font-semibold", {
                    "text-gray-900": theme === "light",
                    "text-white": theme === "dark"
                  })}>
                    Notifications
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={clsx("p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700", {
                      "text-gray-500": theme === "light",
                      "text-gray-400": theme === "dark"
                    })}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {unreadCount > 0 && (
                  <p className={clsx("text-sm mt-1", {
                    "text-gray-600": theme === "light",
                    "text-gray-400": theme === "dark"
                  })}>
                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className={clsx("w-12 h-12 mx-auto mb-4", {
                      "text-gray-300": theme === "light",
                      "text-gray-600": theme === "dark"
                    })} />
                    <p className={clsx("text-gray-500", {
                      "text-gray-400": theme === "dark"
                    })}>
                      No notifications yet
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={clsx("p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors", {
                          "bg-blue-50 dark:bg-blue-900/20": !notification.read
                        })}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={clsx("text-sm font-medium", {
                              "text-gray-900": theme === "light",
                              "text-white": theme === "dark"
                            })}>
                              {notification.title}
                            </h4>
                            <p className={clsx("text-sm mt-1", {
                              "text-gray-600": theme === "light",
                              "text-gray-400": theme === "dark"
                            })}>
                              {notification.message}
                            </p>
                            <p className={clsx("text-xs mt-2", {
                              "text-gray-500": theme === "light",
                              "text-gray-400": theme === "dark"
                            })}>
                              {new Date(notification.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;