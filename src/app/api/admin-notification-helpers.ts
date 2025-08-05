import { sendAdminNotification } from './send-admin-notification';

// Helper function to send order-related admin notifications
export const notifyAdminOfOrderChange = async (
  orderId: string,
  orderData: any,
  notificationType: 'New Order Placed' | 'Order Cancelled' | 'Order Status Updated'
) => {
  try {
    // Extract customer information from order data
    const orderInfo = orderData.order_info || {};
    const customerName = `${orderInfo.firstName || ''} ${orderInfo.lastName || ''}`.trim() || 'Unknown Customer';
    const customerEmail = orderInfo.email || 'Unknown Email';
    const customerPhone = orderInfo.phone || '';
    const customerAddress = `${orderInfo.address || ''}, ${orderInfo.city || ''}, ${orderInfo.postalCode || ''}`.trim();

    // Send the notification
    await sendAdminNotification({
      notificationType,
      orderId: orderId,
      orderStatus: orderData.status || 'unknown',
      orderDate: orderData.created_at || new Date().toISOString(),
      orderTotal: orderData.total || 0,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      products: orderData.products || []
    });

    console.log(`Admin notification sent: ${notificationType} for order ${orderId}`);
  } catch (error) {
    console.error(`Failed to send admin notification for order ${orderId}:`, error);
    // Don't throw - we don't want email failures to break order processing
  }
};

// Function to send admin notification when order is cancelled
export const notifyAdminOfCancellation = async (orderId: string, orderData: any) => {
  await notifyAdminOfOrderChange(orderId, orderData, 'Order Cancelled');
};

// Function to send admin notification when order status is updated
export const notifyAdminOfStatusUpdate = async (orderId: string, orderData: any) => {
  await notifyAdminOfOrderChange(orderId, orderData, 'Order Status Updated');
};

// Function to send admin notification when new order is placed
export const notifyAdminOfNewOrder = async (orderId: string, orderData: any) => {
  await notifyAdminOfOrderChange(orderId, orderData, 'New Order Placed');
};
