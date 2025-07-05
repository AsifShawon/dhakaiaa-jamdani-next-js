import { supabase } from "@/app/utils/supabase/supabaseClient";

export type SignupData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export const signupUser = async (userData: SignupData) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  if (authError) {
    throw new Error(`Authentication failed: ${authError.message}`);
  }

  const uid = authData?.user?.id;
  if (!uid) {
    throw new Error('User ID not found after signup');
  }

  const { error: profileError } = await supabase.from("profiles").insert([{
    uid,
    firstname: userData.firstname,
    lastname: userData.lastname,
    role: 'user',
    phone_number: null,
    image_url: null,
  }]);

  if (profileError) {
    throw new Error(`Profile creation failed: ${profileError.message}`);
  }

  return { success: true, userId: uid };
};