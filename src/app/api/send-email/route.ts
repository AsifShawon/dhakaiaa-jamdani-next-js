import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    if (type === "order_confirmation") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.customerEmail,
        subject: `Order Confirmed #${data.orderId} - Dhakaia Jamdani`,
        html: generateCustomerEmailHTML(data),
      });

      if (process.env.ADMIN_EMAIL) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `🛍️ New Order #${data.orderId} - ৳${data.total}`,
          html: generateAdminEmailHTML(data),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateCustomerEmailHTML(data: any): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
      body { font-family: Arial, sans-serif; background: #f6f9fc; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(135deg, #ef4444, #f97316); padding: 32px; text-align: center; color: white; }
      .header h1 { margin: 0; font-size: 28px; }
      .header p { margin: 8px 0 0; opacity: 0.9; }
      .badge { display: inline-block; background: rgba(255,255,255,0.2); border-radius: 20px; padding: 4px 16px; margin-top: 12px; font-size: 14px; }
      .body { padding: 32px; }
      .info-box { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444; }
      .info-row { display: flex; justify-content: space-between; padding: 6px 0; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0; }
      .products-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      .products-table th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 13px; color: #64748b; text-transform: uppercase; }
      .products-table td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #374151; }
      .total-row { background: #fef2f2; }
      .total-row td { font-weight: 700; color: #ef4444; font-size: 16px; }
      .cod-banner { background: linear-gradient(135deg, #ecfdf5, #d1fae5); border: 1px solid #6ee7b7; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: center; }
      .tracking-section { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: center; }
      .footer { background: #f8fafc; padding: 20px 32px; text-align: center; color: #94a3b8; font-size: 12px; }
    </style></head><body>
    <div class="container"><div class="header"><h1>✅ Order Confirmed!</h1><p>Thank you for shopping with Dhakaia Jamdani</p><div class="badge">Order #${data.orderId}</div></div>
    <div class="body">
    <div class="cod-banner"><h3>💵 Cash on Delivery</h3><p>Please keep ৳${data.total} ready when your order arrives at your doorstep.</p></div>
    <div class="info-box"><div class="info-row"><span>Name</span><span>${data.firstName} ${data.lastName}</span></div><div class="info-row"><span>Address</span><span>${data.address}</span></div><div class="info-row"><span>City</span><span>${data.city}, ${data.postalCode}</span></div><div class="info-row"><span>Phone</span><span>${data.phone}</span></div></div>
    <table class="products-table"><thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead><tbody>
      ${data.products
        .map(
          (p: any) =>
            `<tr><td>${p.title}</td><td>${p.quantity}</td><td>৳${(p.price * p.quantity).toFixed(2)}</td></tr>`
        )
        .join("")}
      <tr class="total-row"><td colspan="2">Total Amount</td><td>৳${data.total}</td></tr>
    </tbody></table>
    <div class="tracking-section"><h3>Order Status: Order Placed</h3><p>Track your order in dashboard.</p></div>
    </div><div class="footer">© Dhakaia Jamdani</div></div></body></html>`;
}

function generateAdminEmailHTML(data: any): string {
  return `<h2>New Order #${data.orderId}</h2>
    <p><strong>Customer:</strong> ${data.firstName} ${data.lastName} (${data.customerEmail})</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Address:</strong> ${data.address}, ${data.city}, ${data.postalCode}</p>
    <p><strong>Total:</strong> ৳${data.total}</p>
    <ul>${data.products
      .map((p: any) => `<li>${p.title} x${p.quantity} - ৳${p.price}</li>`)
      .join("")}</ul>
    <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/Admin/Orders">View in Admin Panel →</a></p>`;
}
