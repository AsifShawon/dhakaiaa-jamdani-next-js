import { supabase } from "@/app/utils/supabase/supabaseClient";

export const fetchAnalyticsData = async (dateRange: string) => {
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    switch (dateRange) {
      case '1month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(endDate.getMonth() - 6);
    }

    // Fetch orders within date range
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());
    
    if (ordersError) throw ordersError;

    // Fetch all orders for comparison (previous period)
    const previousStartDate = new Date(startDate);
    previousStartDate.setTime(previousStartDate.getTime() - (endDate.getTime() - startDate.getTime()));
    
    const { data: previousOrders, error: prevOrdersError } = await supabase
      .from('orders')
      .select('*')
      .gte('created_at', previousStartDate.toISOString())
      .lt('created_at', startDate.toISOString());
    
    if (prevOrdersError) throw prevOrdersError;

    // Fetch products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');
    
    if (productsError) throw productsError;

    // Fetch customers
    const { data: customers, error: customersError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'user')
      .gte('created_at', startDate.toISOString());
    
    if (customersError) throw customersError;

    const { data: previousCustomers, error: prevCustomersError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'user')
      .gte('created_at', previousStartDate.toISOString())
      .lt('created_at', startDate.toISOString());
    
    if (prevCustomersError) throw prevCustomersError;

    // Calculate overview metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.total, 0);
    const revenueGrowth = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;

    const totalOrders = orders.length;
    const previousOrderCount = previousOrders.length;
    const orderGrowth = previousOrderCount > 0 ? ((totalOrders - previousOrderCount) / previousOrderCount) * 100 : 0;

    const totalCustomers = customers.length;
    const previousCustomerCount = previousCustomers.length;
    const customerGrowth = previousCustomerCount > 0 ? ((totalCustomers - previousCustomerCount) / previousCustomerCount) * 100 : 0;

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Generate monthly data
    const monthlyRevenue = generateMonthlyData(orders, 'revenue', dateRange);
    const monthlyOrders = generateMonthlyData(orders, 'count', dateRange);

    // Category breakdown
    const categoryBreakdown = generateCategoryBreakdown(orders, products);

    // Top products (mock data for now)
    const topProducts = products.slice(0, 5).map(product => ({
      ...product,
      sales: Math.floor(Math.random() * 50) + 10
    })).sort((a, b) => b.sales - a.sales);

    return {
      overview: {
        totalRevenue,
        totalOrders,
        totalProducts: products.length,
        totalCustomers,
        revenueGrowth,
        orderGrowth,
        customerGrowth,
        avgOrderValue
      },
      charts: {
        monthlyRevenue,
        monthlyOrders,
        categoryBreakdown,
        topProducts
      }
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

const generateMonthlyData = (orders: any[], type: 'revenue' | 'count', dateRange: string) => {
  const months = [];
  const now = new Date();
  const monthCount = dateRange === '1month' ? 4 : dateRange === '3months' ? 3 : dateRange === '1year' ? 12 : 6;
  
  for (let i = monthCount - 1; i >= 0; i--) {
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

const generateCategoryBreakdown = (orders: any[], products: any[]) => {
  const categoryTotals: { [key: string]: number } = {};
  
  orders.forEach(order => {
    order.products.forEach((orderProduct: any) => {
      const product = products.find(p => p.id === orderProduct.id);
      if (product) {
        const category = product.category;
        const revenue = product.price * (orderProduct.quantity || 1);
        categoryTotals[category] = (categoryTotals[category] || 0) + revenue;
      }
    });
  });

  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  })).sort((a, b) => b.value - a.value);
};