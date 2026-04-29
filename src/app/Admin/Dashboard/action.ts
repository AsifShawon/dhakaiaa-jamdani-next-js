import { supabase } from "@/app/utils/supabase/supabaseClient";

export const fetchDashboardStats = async () => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 1);
    const previousStartDate = new Date(startDate);
    previousStartDate.setTime(previousStartDate.getTime() - (endDate.getTime() - startDate.getTime()));

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*');
    
    if (ordersError) throw ordersError;

    // Fetch total products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');
    
    if (productsError) throw productsError;

    // Fetch total customers (profiles with user role)
    const { data: customers, error: customersError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'user');
    
    if (customersError) throw customersError;

    const currentPeriodOrders = orders.filter(
      (order) => new Date(order.created_at) >= startDate && new Date(order.created_at) <= endDate
    );
    const previousPeriodOrders = orders.filter(
      (order) => new Date(order.created_at) >= previousStartDate && new Date(order.created_at) < startDate
    );

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const currentRevenue = currentPeriodOrders.reduce((sum, order) => sum + order.total, 0);
    const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.total, 0);
    const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    const orderGrowth =
      previousPeriodOrders.length > 0
        ? ((currentPeriodOrders.length - previousPeriodOrders.length) / previousPeriodOrders.length) * 100
        : 0;

    const recentOrders = orders
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);

    // Generate monthly revenue data for the last 6 months
    const monthlyRevenue = generateMonthlyData(orders, 'revenue');
    const orderTrends = generateMonthlyData(orders, 'count');

    const topProducts = generateTopProducts(orders, products);

    return {
      totalOrders: orders.length,
      totalRevenue,
      totalProducts: products.length,
      totalCustomers: customers.length,
      revenueGrowth,
      orderGrowth,
      recentOrders,
      monthlyRevenue,
      orderTrends,
      topProducts
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

const generateMonthlyData = (orders: any[], type: 'revenue' | 'count') => {
  const months = [];
  const now = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });
    
    const monthOrders = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate.getMonth() === date.getMonth() && 
             orderDate.getFullYear() === date.getFullYear();
    });

    const value = type === 'revenue' 
      ? monthOrders.reduce((sum, order) => sum + order.total, 0)
      : monthOrders.length;

    months.push({
      month: monthName,
      value
    });
  }
  
  return months;
};

const generateTopProducts = (orders: any[], products: any[]) => {
  const productSalesMap: Record<number, number> = {};

  orders.forEach((order) => {
    (order.products || []).forEach((orderProduct: any) => {
      const productId = Number(orderProduct.id);
      const quantity = Number(orderProduct.quantity || 1);
      productSalesMap[productId] = (productSalesMap[productId] || 0) + quantity;
    });
  });

  return Object.entries(productSalesMap)
    .map(([id, sales]) => {
      const product = products.find((p) => Number(p.id) === Number(id));
      return product ? { ...product, sales } : null;
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.sales - a.sales)
    .slice(0, 5);
};

export const fetchNotifications = async () => {
  try {
    const { data, error } = await supabase
      .from('admin_notifications')
      .select('*')
      .eq('read', false)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const { error } = await supabase
      .from('admin_notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};