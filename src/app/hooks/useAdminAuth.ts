"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { getUserData, userProfile, UserProfile } from '@/app/auth/getUser';

interface AdminAuthState {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AdminAuthState>({
    user: null,
    profile: null,
    isAdmin: false,
    isLoading: true,
    isAuthenticated: false,
  });
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAdminAuth = async () => {
      try {
        const [user, profile] = await Promise.all([
          getUserData(),
          userProfile(),
        ]);

        if (!isMounted) return;

        const isAuthenticated = !!user;
        const isAdmin = profile?.role === 'admin';

        setAuthState({
          user,
          profile,
          isAdmin,
          isLoading: false,
          isAuthenticated,
        });

        // Redirect non-admin users
        if (!isAuthenticated) {
          router.replace('/login?redirectTo=' + encodeURIComponent(window.location.pathname));
          return;
        }

        if (!isAdmin) {
          router.replace('/dashboard?error=unauthorized');
          return;
        }
      } catch (error) {
        console.error('Admin auth check failed:', error);
        if (isMounted) {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
          }));
          router.replace('/login?error=auth_failed');
        }
      }
    };

    checkAdminAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const logout = async () => {
    try {
      const { supabase } = await import('@/app/utils/supabase/supabaseClient');
      await supabase.auth.signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    ...authState,
    logout,
  };
}
