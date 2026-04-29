"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase/supabaseClient";

export function useUserOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("uid", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return { orders, loading };
}
