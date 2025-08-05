"use server";
import nodemailer from "nodemailer";

// Create the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Admin email addresses (you can make this configurable)
const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL || "asifbhshawon72@gmail.com",
  // Add more admin emails here if needed
  // "admin2@dhakaiaajamdani.com",
];

// Function to generate HTML email content for admin notifications
function generateAdminNotificationHTML(props: AdminNotificationProps): string {
  const statusColors: Record<string, string> = {
    'processing': '#3B82F6',
    'confirmed': '#10B981',
    'shipped': '#8B5CF6',
    'delivered': '#059669',
    'cancelled': '#EF4444',
    'returned': '#F59E0B',
    'refunded': '#6B7280'
  };

  const statusColor = statusColors[props.orderStatus] || '#6B7280';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Admin Order Notification</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            background-color: #f6f9fc; 
            padding: 20px 0; 
            margin: 0;
          }
          .container { 
            margin: 0 auto; 
            max-width: 600px; 
            padding: 20px; 
            background-color: #ffffff; 
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px -20px;
          }
          .title { 
            font-size: 24px; 
            font-weight: bold; 
            margin: 0;
          }
          .subtitle {
            font-size: 14px;
            opacity: 0.9;
            margin: 5px 0 0 0;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            color: white;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            background-color: ${statusColor};
          }
          .section { 
            margin: 24px 0; 
          }
          .section-title { 
            font-size: 18px; 
            font-weight: bold; 
            margin-bottom: 12px;
            color: #333;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin: 16px 0;
          }
          .info-item {
            background: #f8fafc;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #667eea;
          }
          .info-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .info-value {
            font-size: 14px;
            color: #1e293b;
            font-weight: 500;
          }
          .product-list {
            background: #f8fafc;
            border-radius: 6px;
            padding: 16px;
          }
          .product-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .product-item:last-child {
            border-bottom: none;
          }
          .product-name {
            font-weight: 500;
            color: #1e293b;
          }
          .product-quantity {
            color: #64748b;
            font-size: 14px;
          }
          .product-price {
            font-weight: 600;
            color: #059669;
          }
          .total-section {
            background: #1e293b;
            color: white;
            padding: 16px;
            border-radius: 6px;
            margin: 16px 0;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin: 4px 0;
          }
          .total-final {
            font-size: 18px;
            font-weight: bold;
            border-top: 1px solid #475569;
            padding-top: 8px;
            margin-top: 8px;
          }
          .action-buttons {
            text-align: center;
            margin: 24px 0;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 8px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
          }
          .btn-primary {
            background-color: #3B82F6;
            color: white;
          }
          .btn-secondary {
            background-color: #6B7280;
            color: white;
          }
          .footer {
            text-align: center;
            color: #64748b;
            font-size: 12px;
            margin-top: 32px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="title">${props.notificationType}</div>
            <div class="subtitle">Dhakaiaa Jamdani Admin Panel</div>
          </div>
          
          <div class="section">
            <div class="section-title">Order Details</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Order ID</div>
                <div class="info-value">#${props.orderId}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge">${props.orderStatus}</span>
                </div>
              </div>
              <div class="info-item">
                <div class="info-label">Order Date</div>
                <div class="info-value">${new Date(props.orderDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Total Amount</div>
                <div class="info-value">৳${props.orderTotal.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Customer Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Name</div>
                <div class="info-value">${props.customerName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${props.customerEmail}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Phone</div>
                <div class="info-value">${props.customerPhone || 'N/A'}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Address</div>
                <div class="info-value">${props.customerAddress}</div>
              </div>
            </div>
          </div>

          ${props.products && props.products.length > 0 ? `
          <div class="section">
            <div class="section-title">Ordered Products</div>
            <div class="product-list">
              ${props.products.map(product => `
                <div class="product-item">
                  <div>
                    <div class="product-name">${product.title || 'Product'}</div>
                    <div class="product-quantity">Quantity: ${product.quantity}</div>
                  </div>
                  <div class="product-price">৳${((product.price || 0) * (product.quantity || 1)).toFixed(2)}</div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

          <div class="total-section">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>৳${(props.orderTotal - 100).toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Shipping:</span>
              <span>৳100.00</span>
            </div>
            <div class="total-row total-final">
              <span>Total:</span>
              <span>৳${props.orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <div class="action-buttons">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/Admin/Orders" class="btn btn-primary">
              View in Admin Panel
            </a>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/Admin/Dashboard" class="btn btn-secondary">
              Go to Dashboard
            </a>
          </div>

          <div class="footer">
            <p>This is an automated notification from Dhakaiaa Jamdani</p>
            <p>Please do not reply to this email</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Email sending function for admin notifications
export async function sendAdminNotification(props: AdminNotificationProps) {
  try {
    console.log("Sending admin notification...", props.notificationType);
    
    // Generate HTML content
    const emailContent = generateAdminNotificationHTML(props);

    // Determine subject based on notification type
    let subject = '';
    switch (props.notificationType) {
      case 'New Order Placed':
        subject = `🛍️ New Order #${props.orderId} - ৳${props.orderTotal}`;
        break;
      case 'Order Cancelled':
        subject = `❌ Order #${props.orderId} Cancelled`;
        break;
      case 'Order Status Updated':
        subject = `📦 Order #${props.orderId} - Status: ${props.orderStatus}`;
        break;
      default:
        subject = `📋 Order Update #${props.orderId}`;
    }

    // Send email to all admin addresses
    const emailPromises = ADMIN_EMAILS.map(async (adminEmail) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: subject,
        html: emailContent,
      };

      return await transporter.sendMail(mailOptions);
    });

    const results = await Promise.allSettled(emailPromises);
    
    // Log results
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Admin notification sent to ${ADMIN_EMAILS[index]}: ${result.value.messageId}`);
      } else {
        console.error(`Failed to send admin notification to ${ADMIN_EMAILS[index]}:`, result.reason);
      }
    });

    return { 
      success: true, 
      sent: results.filter(r => r.status === 'fulfilled').length,
      total: ADMIN_EMAILS.length
    };
  } catch (error) {
    console.error("Error sending admin notification: ", error);
    throw error;
  }
}

// Interface for admin notification props
interface AdminNotificationProps {
  notificationType: 'New Order Placed' | 'Order Cancelled' | 'Order Status Updated';
  orderId: string;
  orderStatus: string;
  orderDate: string;
  orderTotal: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress: string;
  products?: Array<{
    title: string;
    quantity: number;
    price: number;
  }>;
}
