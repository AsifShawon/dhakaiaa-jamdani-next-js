import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { supabase } from "../utils/supabase/supabaseClient";
import { fetchProducts } from "../slices/productSlices";

interface Product {
  id: number;
  title: string;
  price: number;
  image_urls?: string[];
}

interface Order {
  id: number;
  created_at: string;
  uid: string;
  status: string;
  total: number;
  products: Product[];
}

const OrdersDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { products, status, filters } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);

  }, [dispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("orders")
          .select("*")
          .eq("uid", user.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;

        setOrders(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusClass = (status: string): string => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "badge-success";
      case "processing":
        return "badge-info";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="p-4">Loading your orders...</div>;
  }

  if (error) {
    return <div className="p-4 text-error">Error: {error}</div>;
  }

  return (
    <div className="card-body">
      <h2 className="card-title">Your Orders</h2>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-center opacity-70">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm opacity-70">
                      {formatDate(order.created_at)}
                    </p>
                    <p className="text-sm">
                      {order.products.length}{" "}
                      {order.products.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">৳ {order.total.toFixed(2)}</p>
                    <div className={`badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                </div>
                <div className="divider my-2"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.products.map((p, index) => {
                    const product = products.find(
                      (_product:any) => _product.id === p.id
                    );
                    console.log(p, products);
                    return product ? (
                      <div key={index} className="flex items-center gap-4">
                        {product.image_urls && product.image_urls[0] && (
                          <Image
                            width={60}
                            height={60}
                            src={product.image_urls[0]}
                            alt={product.title}
                            className="rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-sm opacity-70"> ৳  {product.price}</p>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
