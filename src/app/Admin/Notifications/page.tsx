"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  BellRing, 
  Trash2, 
  Check, 
  CheckCheck, 
  Filter,
  Search,
  Calendar,
  Package,
  ShoppingCart,
  AlertTriangle,
  RefreshCw,
  X
} from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import clsx from "clsx";
import {
  getAdminNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  subscribeToNotifications,
  unsubscribeFromNotifications
} from "@/app/api/admin-notifications";

interface Notification {
  id: string;
  type: 'order' | 'product' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

const NotificationsPage = () => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'product' | 'system'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadNotifications();
    
    // Subscribe to real-time notifications
    const subscription = subscribeToNotifications((newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => {
      unsubscribeFromNotifications(subscription);
    };
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getAdminNotifications();
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

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      setNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
      setSelectedNotifications(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        Array.from(selectedNotifications).map(id => deleteNotification(id))
      );
      setNotifications(prev =>
        prev.filter(notif => !selectedNotifications.has(notif.id))
      );
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error('Error bulk deleting notifications:', error);
    }
  };

  const toggleSelection = (notificationId: string) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(notificationId)) {
        newSet.delete(notificationId);
      } else {
        newSet.add(notificationId);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    const filteredIds = filteredNotifications.map(n => n.id);
    setSelectedNotifications(new Set(filteredIds));
  };

  const deselectAll = () => {
    setSelectedNotifications(new Set());
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === notification.type);
    
    const matchesSearch = searchTerm === '' ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return ShoppingCart;
      case 'product':
        return Package;
      case 'system':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'product':
        return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'system':
        return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const cardClasses = clsx(
    "rounded-xl shadow-lg border transition-all duration-300",
    {
      "bg-white border-gray-200": theme === "light",
      "bg-gray-800 border-gray-700": theme === "dark",
    }
  );

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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className={clsx("text-3xl md:text-4xl font-bold flex items-center gap-3", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                <Bell className="w-8 h-8" />
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </h1>
              <p className={clsx("text-lg mt-2", {
                "text-gray-600": theme === "light",
                "text-gray-400": theme === "dark",
              })}>
                Manage your admin notifications and stay updated.
              </p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadNotifications}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </motion.button>
              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark All Read
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={clsx("p-6 mb-8", cardClasses)}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={clsx("w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 focus:border-transparent", {
                  "bg-white border-gray-300 text-gray-900": theme === "light",
                  "bg-gray-700 border-gray-600 text-white": theme === "dark",
                })}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {['all', 'unread', 'order', 'product', 'system'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  className={clsx("px-3 py-1 rounded-full text-sm font-medium transition-colors", {
                    "bg-red-500 text-white": filter === filterOption,
                    "bg-gray-200 text-gray-700 hover:bg-gray-300": filter !== filterOption && theme === "light",
                    "bg-gray-700 text-gray-300 hover:bg-gray-600": filter !== filterOption && theme === "dark",
                  })}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.size > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={deselectAll}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                  Deselect All
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedNotifications.size})
                </button>
              </div>
            )}
          </div>

          {/* Select All */}
          {filteredNotifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={selectAll}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Select All ({filteredNotifications.length})
              </button>
            </div>
          )}
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredNotifications.length === 0 ? (
            <div className={clsx("p-12 text-center", cardClasses)}>
              <Bell className={clsx("w-16 h-16 mx-auto mb-4", {
                "text-gray-400": theme === "light",
                "text-gray-600": theme === "dark",
              })} />
              <h3 className={clsx("text-xl font-semibold mb-2", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                No notifications found
              </h3>
              <p className={clsx("", {
                "text-gray-600": theme === "light",
                "text-gray-400": theme === "dark",
              })}>
                {filter === 'all' 
                  ? "You're all caught up! No notifications to display."
                  : `No ${filter} notifications found.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const IconComponent = getNotificationIcon(notification.type);
              const isSelected = selectedNotifications.has(notification.id);
              
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                  className={clsx("p-6 transition-all duration-300 hover:shadow-xl", cardClasses, {
                    "ring-2 ring-red-500 ring-opacity-50": isSelected,
                    "opacity-60": notification.read,
                  })}
                >
                  <div className="flex items-start gap-4">
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(notification.id)}
                      className="mt-1 w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    {/* Icon */}
                    <div className={clsx("p-2 rounded-lg", getTypeColor(notification.type))}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={clsx("text-lg font-semibold mb-1", {
                            "text-gray-900": theme === "light",
                            "text-white": theme === "dark",
                          })}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 w-2 h-2 bg-red-500 rounded-full inline-block"></span>
                            )}
                          </h3>
                          <p className={clsx("mb-2", {
                            "text-gray-600": theme === "light",
                            "text-gray-400": theme === "dark",
                          })}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className={clsx("flex items-center gap-1", {
                              "text-gray-500": theme === "light",
                              "text-gray-400": theme === "dark",
                            })}>
                              <Calendar className="w-4 h-4" />
                              {new Date(notification.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            <span className={clsx("px-2 py-1 rounded-full text-xs font-medium", getTypeColor(notification.type))}>
                              {notification.type}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          {!notification.read && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationsPage;
