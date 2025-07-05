import { supabase } from "@/app/utils/supabase/supabaseClient";

export interface UserProfile {
    firstname: string;
    lastname: string;
    role: string;
}

export async function getUserData() {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) {
    // If there's an error fetching the user, just return null
    // console.log("Error fetching user:", error);
    return null;
  }
  
  // If no user is logged in, return null
  if (!data?.user) {
    return null;
  }

  // console.log("User data:", data.user);
  return data.user;
}

export async function userProfile() {
  try {
    const user = await getUserData();
    if (!user) {
      console.log("No user logged in."); // Handle case when no user is logged in
      return null;
    }

    // Fetch the user profile from the 'profiles' table
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error.message);
      return null;
    }

    return data; // Return profile data if available
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}
