"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/supabaseServer";
import { userProfile } from "../auth/getUser";

export async function login(formData: FormData) {
  const supabase = await createClient();
  console.log("Login formdata", formData);

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
  const profile = await userProfile();
  if (profile?.role === "admin") {
    redirect("/Admin/AllProducts");
  } else {
    redirect("/dashboard");
  }
}
