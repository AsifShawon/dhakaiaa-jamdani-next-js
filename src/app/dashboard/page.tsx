"use client";
import { useEffect, useState } from "react";
import { getUserData, userProfile } from "../auth/getUser";
import { User } from "@supabase/supabase-js";
import { UserProfile } from "../auth/getUser";
import { redirect } from "next/navigation";
import EnhancedDashboard from "../components/user/EnhancedDashboard";

export default function Dashboard() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserData();
        const profile = await userProfile();
        
        setData(user);
        setUserData(profile);
        
        if (profile?.role === "admin") {
          redirect("/Admin/AllProducts");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!data) {
    redirect('/login');
    return null;
  }

  return <EnhancedDashboard />;
}