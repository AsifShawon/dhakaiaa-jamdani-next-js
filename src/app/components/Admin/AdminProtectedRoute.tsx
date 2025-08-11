"use client";

import React from 'react';
import { useAdminAuth } from '@/app/hooks/useAdminAuth';
import { Shield, AlertTriangle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAdmin, isLoading, isAuthenticated, user, profile } = useAdminAuth();

  // Loading state
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Loader2 className="w-12 h-12 text-blue-600 mb-4" />
            </motion.div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Verifying Admin Access
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Please wait while we authenticate your credentials...
            </p>
          </motion.div>
        </div>
      )
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You need to be logged in to access the admin panel.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            You don&apos;t have admin privileges to access this area.
          </p>
          {user && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Logged in as: {user.email}
              {profile && (
                <span className="block">
                  Role: {profile.role}
                </span>
              )}
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Go to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authorized admin user
  return <>{children}</>;
};

export default AdminProtectedRoute;
