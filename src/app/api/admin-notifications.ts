import { supabase } from "@/app/utils/supabase/supabaseClient";

export interface AdminNotification {
  id: string;
  type: 'order' | 'product' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

// Get all admin notifications
export const getAdminNotifications = async (): Promise<AdminNotification[]> => {
  const { data, error } = await supabase
    .from('admin_notifications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin notifications:', error);
    throw error;
  }

  return data || [];
};

// Get unread notifications count
export const getUnreadNotificationsCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('admin_notifications')
    .select('*', { count: 'exact', head: true })
    .eq('read', false);

  if (error) {
    console.error('Error getting unread count:', error);
    throw error;
  }

  return count || 0;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const { error } = await supabase
    .from('admin_notifications')
    .update({ read: true })
    .eq('id', notificationId);

  if (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<void> => {
  const { error } = await supabase
    .from('admin_notifications')
    .update({ read: true })
    .eq('read', false);

  if (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Delete a notification
export const deleteNotification = async (notificationId: string): Promise<void> => {
  const { error } = await supabase
    .from('admin_notifications')
    .delete()
    .eq('id', notificationId);

  if (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

// Create manual notification (for system messages)
export const createManualNotification = async (
  type: 'order' | 'product' | 'system',
  title: string,
  message: string
): Promise<void> => {
  const { error } = await supabase
    .from('admin_notifications')
    .insert([{ type, title, message }]);

  if (error) {
    console.error('Error creating manual notification:', error);
    throw error;
  }
};

// Subscribe to real-time notifications
export const subscribeToNotifications = (callback: (notification: AdminNotification) => void) => {
  const subscription = supabase
    .channel('admin_notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'admin_notifications'
      },
      (payload) => {
        callback(payload.new as AdminNotification);
      }
    )
    .subscribe();

  return subscription;
};

// Unsubscribe from notifications
export const unsubscribeFromNotifications = (subscription: any) => {
  supabase.removeChannel(subscription);
};
