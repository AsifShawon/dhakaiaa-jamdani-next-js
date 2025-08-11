import React from 'react';
import { getUserData, userProfile } from '@/app/auth/getUser';

/**
 * Utility functions for admin authentication and authorization
 */

/**
 * Check if the current user is an admin
 * @returns Promise<boolean> - true if user is admin, false otherwise
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const [user, profile] = await Promise.all([
      getUserData(),
      userProfile()
    ]);
    
    return !!(user && profile?.role === 'admin');
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Check if the current user is authenticated
 * @returns Promise<boolean> - true if user is authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getUserData();
    return !!user;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

/**
 * Get current user's role
 * @returns Promise<string | null> - user role or null if not found
 */
export async function getUserRole(): Promise<string | null> {
  try {
    const profile = await userProfile();
    return profile?.role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
}

/**
 * Redirect to login with optional return URL
 * @param returnUrl - URL to redirect to after login
 */
export function redirectToLogin(returnUrl?: string): void {
  const loginUrl = new URL('/login', window.location.origin);
  if (returnUrl) {
    loginUrl.searchParams.set('redirectTo', returnUrl);
  }
  window.location.href = loginUrl.toString();
}

/**
 * Redirect to appropriate dashboard based on user role
 */
export async function redirectToDashboard(): Promise<void> {
  try {
    const profile = await userProfile();
    if (profile?.role === 'admin') {
      window.location.href = '/Admin/Dashboard';
    } else {
      window.location.href = '/dashboard';
    }
  } catch (error) {
    console.error('Error redirecting to dashboard:', error);
    window.location.href = '/dashboard';
  }
}
