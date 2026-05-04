import { supabase } from "@/app/utils/supabase/supabaseClient";

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("category");
  
  if (error) {
    console.error("Error fetching categories:", error);
    return ["Sharee", "Panjabi", "Threepcs"]; // Fallback
  }

  const uniqueCategories = Array.from(new Set(data.map((p: any) => p.category)))
    .filter(Boolean)
    .sort() as string[];
    
  return uniqueCategories.length > 0 ? uniqueCategories : ["Sharee", "Panjabi", "Threepcs"];
};
