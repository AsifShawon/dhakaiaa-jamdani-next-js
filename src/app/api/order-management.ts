import { supabase } from "@/app/utils/supabase/supabaseClient";
import { notifyAdminOfCancellation, notifyAdminOfStatusUpdate } from "./admin-notification-helpers";

// Function to update order status with admin notification
export const updateOrderStatus = async (
  orderId: string, 
  newStatus: string
): Promise<void> => {
  try {
    // Get the current order data
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (fetchError) throw fetchError;

    // Update the order status
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Send admin notification based on the status change
    if (newStatus === 'cancelled') {
      await notifyAdminOfCancellation(orderId, updatedOrder);
    } else {
      await notifyAdminOfStatusUpdate(orderId, updatedOrder);
    }

    console.log(`Order ${orderId} status updated to ${newStatus} and admin notified`);
  } catch (error) {
    console.error(`Error updating order ${orderId} status:`, error);
    throw error;
  }
};

// Function to cancel an order
export const cancelOrder = async (orderId: string): Promise<void> => {
  await updateOrderStatus(orderId, 'cancelled');
};

// Function to confirm an order
export const confirmOrder = async (orderId: string): Promise<void> => {
  await updateOrderStatus(orderId, 'confirmed');
};

// Function to mark order as shipped
export const shipOrder = async (orderId: string): Promise<void> => {
  await updateOrderStatus(orderId, 'shipped');
};

// Function to mark order as delivered
export const deliverOrder = async (orderId: string): Promise<void> => {
  await updateOrderStatus(orderId, 'delivered');
};
