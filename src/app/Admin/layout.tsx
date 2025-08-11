"use client";

import React, { useState } from "react";
import ModernSidebar from "../components/Admin/ModernSidebar";
import AdminProtectedRoute from "../components/Admin/AdminProtectedRoute";
import { useAdminAuth } from "../hooks/useAdminAuth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, profile } = useAdminAuth();

  return (
    <AdminProtectedRoute>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white dark:bg-gray-800 shadow"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
        {/* Admin Header Bar */}
        <div className="md:hidden fixed top-0 right-0 left-0 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-40 h-16 flex items-center justify-between px-4">
          <div className="flex items-center ml-12">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {profile?.firstname} {profile?.lastname}
            </span>
            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              aria-label="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        <ModernSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 md:ml-64 transition-all duration-300">
          {/* Desktop header */}
          <div className="hidden md:flex bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {profile?.firstname} {profile?.lastname}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="p-8 pt-20 md:pt-8">
            {children}
          </div>
        </main>
      </div>
    </AdminProtectedRoute>
  );
};

export default Layout;