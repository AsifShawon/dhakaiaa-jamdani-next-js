"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/app/utils/supabase/supabaseClient";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return setLoading(false);
      const { data } = await supabase.from("orders").select("*").eq("id", orderId).single();
      setOrder(data || null);
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg" /></div>;
  if (!order) return <div className="min-h-screen pt-24 text-center">Order not found.</div>;

  const info = order.order_info || {};

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center text-3xl">✓</div>
        <h1 className="text-3xl font-bold mt-4">Order Confirmed</h1>
        <p className="text-base-content/70">Order #{order.id}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="font-semibold">Shipping Address</h2>
            <p>{info.firstName} {info.lastName}</p>
            <p>{info.address}</p>
            <p>{info.city}, {info.postalCode}</p>
            <p>{info.phone}</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="font-semibold">Cash on Delivery</h2>
            <p>Please keep ৳{Number(order.total).toFixed(2)} ready.</p>
            <p className="text-sm text-base-content/70">Estimated delivery: 3-7 business days.</p>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow mt-4">
        <div className="card-body">
          <h2 className="font-semibold">Order Items</h2>
          {(order.products || []).map((p: any, idx: number) => (
            <div key={idx} className="flex justify-between border-b py-2">
              <span>Product #{p.id} x {p.quantity}</span>
              <span>Status: {order.status}</span>
            </div>
          ))}
          <div className="font-semibold mt-3">Total: ৳{Number(order.total).toFixed(2)}</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow mt-4">
        <div className="card-body">
          <h2 className="font-semibold">Order Timeline</h2>
          <ul className="steps steps-vertical md:steps-horizontal w-full">
            <li className="step step-primary">Order Placed</li>
            <li className={`step ${["processing", "shipped", "delivered"].includes(order.status) ? "step-primary" : ""}`}>Processing</li>
            <li className={`step ${["shipped", "delivered"].includes(order.status) ? "step-primary" : ""}`}>Shipped</li>
            <li className={`step ${order.status === "delivered" ? "step-primary" : ""}`}>Delivered</li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3 mt-6 justify-center">
        <Link href="/dashboard?tab=orders" className="btn btn-primary">Track My Order</Link>
        <Link href="/Shop" className="btn btn-outline">Continue Shopping</Link>
      </div>
    </div>
  );
}
