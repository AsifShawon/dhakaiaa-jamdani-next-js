"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/supabaseServer";
import { userProfile } from "../auth/getUser";

export async function login(formData: FormData) {
  const supabase = await createClient();
  console.log("Login formdata", formData);

  // Get redirect URL from form data or default
  const redirectTo = formData.get("redirectTo") as string || "";

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log(data, error);
  if (error) {
    redirect("/login/error");
  }

  revalidatePath("/", "layout");
  
  try {
    const profile = await userProfile();
    
    if (profile?.role === "admin") {
      // If there's a redirect URL and it's an admin route, go there
      if (redirectTo && redirectTo.startsWith('/Admin')) {
        redirect(redirectTo);
      } else {
        redirect("/Admin/Dashboard");
      }
    } else {
      // Regular user
      if (redirectTo && !redirectTo.startsWith('/Admin')) {
        redirect(redirectTo);
      } else {
        redirect("/dashboard");
      }
    }
  } catch (error) {
    console.error("Error fetching profile after login:", error);
    // Fallback redirect
    redirect("/dashboard");
  }
}
