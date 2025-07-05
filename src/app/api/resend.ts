"use server";
import { Resend } from "resend";
import { OrderConfirm } from "@/app/components/email_templates/order-comfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (subject: string, order: any, formdata: any, products: any) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: formdata.email,
      subject: subject,
      react: OrderConfirm({
        orderId: order.id,
        firstName: formdata.firstName,
        lastName: formdata.lastName,
        email: formdata.email,
        address: formdata.address,
        city: formdata.city,
        postalCode: formdata.postalCode,
        phone: formdata.phone,
        total: order.total,
        products: products,
      }),
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};
