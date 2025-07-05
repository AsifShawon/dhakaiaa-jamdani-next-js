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

// Function to safely format numbers
const formatPrice = (value: any): string => {
  if (value === undefined || value === null || isNaN(Number(value))) {
    return "0.00";
  }
  return Number(value).toFixed(2);
};

// Function to generate HTML email content
function generateEmailHTML(props: OrderConfirmProps): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px 0; }
          .container { margin: 0 auto; max-width: 600px; padding: 20px; background-color: #ffffff; border-radius: 8px; }
          .title { font-size: 24px; color: #4CAF50; font-weight: bold; }
          .section { margin-top: 24px; }
          .section-title { font-size: 18px; font-weight: bold; }
          .product-row { display: flex; justify-content: space-between; margin: 8px 0; }
          .divider { border-top: 1px solid #e0e0e0; margin: 16px 0; }
          .total-row { display: flex; justify-content: space-between; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="title">Order Confirmation</div>
          
          <p>Hi ${props.firstName || ''} ${props.lastName || ''},</p>
          <p>Thank you for your order! Your order ID is <strong>${props.orderId || 'N/A'}</strong>.</p>
          
          <div class="section">
            <div class="section-title">Shipping Information:</div>
            <p>
              ${props.address || 'N/A'}<br>
              ${props.city || 'N/A'}, ${props.postalCode || 'N/A'}<br>
              ${props.phone || 'N/A'}<br>
              ${props.email || 'N/A'}
            </p>
          </div>
          
          <div class="section">
            <div class="section-title">Order Summary:</div>
            ${Array.isArray(props.products) ? props.products.map(product => {
              // Get quantity from either the product's quantity property or from the cart items
              const quantity = props.cartItems?.[product.id] || 1;
              const price = Number(product.discounted_price || product.price || 0);
              const total = price * quantity;
              
              return `
                <div class="product-row">
                  <div>${product.title || 'Product'} x ${quantity}</div>
                  <div>৳${formatPrice(total)}</div>
                </div>
              `;
            }).join('') : '<p>No products in order</p>'}
            
            <div class="divider"></div>
            
            <div class="total-row">
              <div>Total:</div>
              <div>৳${formatPrice(props.total)}</div>
            </div>
          </div>
          
          <p class="section">Your order is being processed. We will notify you when it is shipped.</p>
          
          <p>Thank you for shopping with us!</p>
          
          <p class="section"><strong>Your Store Team</strong></p>
        </div>
      </body>
    </html>
  `;
}

// Email sending function
export async function sendMail(subject: string, order: any, formdata: any, products: any, cartItems?: Record<number, number>) {
  try {
    console.log("Products data received:", JSON.stringify(products, null, 2));
    console.log("Cart items received:", JSON.stringify(cartItems, null, 2));
    
    // Create props for the email template
    const emailProps: OrderConfirmProps = {
      orderId: order?.id || 'N/A',
      firstName: formdata?.firstName || '',
      lastName: formdata?.lastName || '',
      email: formdata?.email || '',
      address: formdata?.address || '',
      city: formdata?.city || '',
      postalCode: formdata?.postalCode || '',
      phone: formdata?.phone || '',
      total: Number(order?.total || 0),
      products: Array.isArray(products) ? products : [],
      cartItems: cartItems || {}
    };

    // Generate HTML content
    const emailContent = generateEmailHTML(emailProps);

    // Setup email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: formdata?.email || process.env.EMAIL_USER, // Fallback to sender if recipient email is missing
      subject: subject || 'Order Confirmation',
      html: emailContent,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { id: info.messageId, success: true };
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
}

// Updated interface definition to include cart items
interface OrderConfirmProps {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  total: number;
  products: any[];
  cartItems?: Record<number, number>; // Maps product ID to quantity
}