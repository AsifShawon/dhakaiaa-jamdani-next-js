// app/admin/orders/actions.ts
import { supabase } from "@/app/utils/supabase/supabaseClient";

export interface Product {
  title: string;
  price: number;
  image_urls?: string[];
}

export interface Order {
  id: number;
  created_at: string;
  uid: string;
  status: string;
  total: number;
  products: Product[];
  Order_info: JSON
}

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform the data to include user details

    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Fetch a single order by ID
export const fetchOrderById = async (orderId: number) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, profiles(name, email, phone, address)')
      .eq('id', orderId)
      .single();

    if (error) throw error;

    // Transform the data to include user details
    const orderWithUserDetails = {
      ...data,
      user_details: data.profiles ? {
        name: data.profiles.name,
        email: data.profiles.email,
        phone: data.profiles.phone,
        address: data.profiles.address
      } : undefined,
      // Remove the profiles object to keep the structure clean
      profiles: undefined
    };

    return orderWithUserDetails;
  } catch (error) {
    console.error(`Error fetching order #${orderId}:`, error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId: number, status: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error updating order #${orderId} status:`, error);
    throw error;
  }
};