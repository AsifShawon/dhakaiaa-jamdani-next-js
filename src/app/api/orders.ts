import { supabase } from "@/app/utils/supabase/supabaseClient";

interface Order {
  id?: number; 
  uid: string;
  status: "confirmed" | "processing" | "shipped" | "cancelled" | "delivered" | "returned" | "refunded";
  total: number;
  products: JSON[];
  created_at?: string;
  Order_info: JSON;
}

export const saveOrder = async (order: Omit<Order, 'id' | 'created_at'>) => {
  const { data: savedOrder, error } = await supabase
    .from("orders")
    .insert([order])
    .select();

  if (error) throw error;
  
  if (!savedOrder) throw new Error("No order created");
  
  return savedOrder[0] as Order;
};