"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Package, Settings, ShoppingBag, User, LogOut, Trash2, MessageCircle } from "lucide-react";
import { getUserData, userProfile, UserProfile } from "@/app/auth/getUser";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/app/utils/supabase/supabaseClient";
import { useUserOrders } from "@/app/hooks/useUserOrders";
import { addToCart, addToFavorites, syncCart, syncFavorites } from "@/app/slices/cartSlice";
import { useTheme } from "@/app/context/ThemeContext";
import { ToastProvider, useToast } from "@/app/components/ui/Toast";

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [ordersFilter, setOrdersFilter] = useState("all");
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [profileData, setProfileData] = useState({ firstname: "", lastname: "", phone: "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState({ emailNotifications: true, newsletter: false });
  const dispatch = useDispatch<any>();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { orders, loading } = useUserOrders();
  const { favorites } = useSelector((state: any) => state.cart);
  const { products } = useSelector((state: any) => state.products);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userProfile();
      const user = await getUserData();
      setUserData(userData);
      setUser(user);
      setProfileData({
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        phone: userData?.phone_number || "",
      });
    };
    fetchUserData();
  }, []);

  const favoriteProducts = products.filter((product: any) => favorites.includes(product.id));
  const filteredOrders = useMemo(
    () => orders.filter((order) => (ordersFilter === "all" ? true : order.status === ordersFilter)),
    [orders, ordersFilter]
  );
  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleProfileUpdate = async () => {
    if (!user?.id) return;
    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        firstname: profileData.firstname,
        lastname: profileData.lastname,
        phone_number: profileData.phone,
        preferences,
      })
      .eq("uid", user.id);
    if (!error) showToast("Profile updated successfully!", "success");
    else showToast("Failed to update profile", "error");
    setIsSaving(false);
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword.length < 8) return showToast("Password must be at least 8 characters", "error");
    if (passwordData.newPassword !== passwordData.confirmPassword) return showToast("Passwords do not match", "error");
    const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword });
    if (error) showToast(error.message, "error");
    else showToast("Password updated successfully", "success");
  };

  const uploadAvatar = async (file?: File) => {
    if (!file || !user?.id) return;
    const ext = file.name.split(".").pop();
    const path = `${user.id}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) return showToast("Avatar upload failed", "error");
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("profiles").update({ image_url: data.publicUrl }).eq("uid", user.id);
    showToast("Avatar updated", "success");
  };

  const orderSteps = ["placed", "processing", "shipped", "delivered"];
  const currentStepIndex = (status: string) => {
    const idx = orderSteps.indexOf((status || "").toLowerCase());
    return idx === -1 ? 0 : idx;
  };

  const addFavoriteToCart = async (product: any) => {
    dispatch(addToCart(product));
    await dispatch(syncCart());
    showToast("Added to cart", "success");
  };

  const removeFavorite = async (product: any) => {
    dispatch(addToFavorites(product));
    await dispatch(syncFavorites());
    showToast("Removed from favorites", "info");
  };

  return (
    <div className="min-h-screen bg-base-200 pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <aside className="bg-base-100 rounded-xl shadow p-4 h-fit">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`btn btn-ghost w-full justify-start mb-2 ${activeTab === tab.id ? "btn-active" : ""}`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </aside>
          <section className="bg-base-100 rounded-xl shadow p-6">
            {activeTab === "overview" && (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                    {(userData?.firstname?.[0] || "U").toUpperCase()}{(userData?.lastname?.[0] || "").toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Welcome, {userData?.firstname || "Customer"}</h2>
                    <p className="text-sm opacity-70">{user?.email} | Member since {new Date(user?.created_at || "").toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="stat bg-base-200 rounded"><div className="stat-title">Total Orders</div><div className="stat-value text-xl">{orders.length}</div></div>
                  <div className="stat bg-base-200 rounded"><div className="stat-title">Total Spent</div><div className="stat-value text-xl">৳{totalSpent.toFixed(0)}</div></div>
                  <div className="stat bg-base-200 rounded"><div className="stat-title">Saved Items</div><div className="stat-value text-xl">{favoriteProducts.length}</div></div>
                  <div className="stat bg-base-200 rounded"><div className="stat-title">Loyalty Points</div><div className="stat-value text-xl">{orders.length * 25}</div></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Recent Orders</h3>
                  {loading ? <span className="loading loading-spinner" /> : orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-3 border rounded mb-2 flex justify-between">
                      <span>#{order.id} - {new Date(order.created_at).toLocaleDateString()}</span>
                      <span className="badge">{order.status}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link href="/Shop" className="btn btn-outline"><ShoppingBag className="w-4 h-4" /> Shop Now</Link>
                  <button className="btn btn-outline" onClick={() => setActiveTab("orders")}><Package className="w-4 h-4" /> My Orders</button>
                  <button className="btn btn-outline" onClick={() => setActiveTab("favorites")}><Heart className="w-4 h-4" /> Wishlist</button>
                  <Link href="https://wa.me/8801711461083" target="_blank" className="btn btn-outline"><MessageCircle className="w-4 h-4" /> Support</Link>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {["all", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                    <button key={s} onClick={() => setOrdersFilter(s)} className={`btn btn-sm ${ordersFilter === s ? "btn-primary" : "btn-ghost"}`}>{s}</button>
                  ))}
                </div>
                {loading && <span className="loading loading-spinner" />}
                {!loading && filteredOrders.map((order) => {
                  const orderInfo = order.order_info || {};
                  const step = currentStepIndex(order.status);
                  return (
                    <div key={order.id} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between flex-wrap gap-2">
                        <div>Order #{order.id} - {new Date(order.created_at).toLocaleDateString()}</div>
                        <span className="badge badge-outline">{order.status}</span>
                      </div>
                      <div className="flex mt-2 -space-x-2">
                        {(order.products || []).slice(0, 3).map((p: any, idx: number) => (
                          <div key={idx} className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center text-xs">{p.quantity}x</div>
                        ))}
                      </div>
                      <p className="text-sm mt-2">{(order.products || []).length} items • ৳{Number(order.total).toFixed(2)}</p>
                      {["processing", "shipped"].includes(order.status) && <p className="text-warning text-sm">Please keep ৳{Number(order.total).toFixed(2)} ready</p>}
                      <ul className="steps w-full my-3">
                        {orderSteps.map((s, idx) => <li key={s} className={`step ${idx <= step ? "step-primary" : ""}`}>{s}</li>)}
                      </ul>
                      <button className="btn btn-xs btn-outline" onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}>View Details</button>
                      {expandedOrderId === order.id && (
                        <div className="mt-3 text-sm bg-base-200 p-3 rounded">
                          <p>{orderInfo.firstName} {orderInfo.lastName} | {orderInfo.phone}</p>
                          <p>{orderInfo.address}, {orderInfo.city}</p>
                          <div className="mt-2">{(order.products || []).map((p: any, i: number) => <div key={i}>Product #{p.id} x {p.quantity}</div>)}</div>
                          <a className="btn btn-sm mt-2" href={`https://wa.me/88${orderInfo.phone || ""}`} target="_blank">WhatsApp</a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                {!favoriteProducts.length ? (
                  <div className="text-center py-10">
                    <Heart className="w-16 h-16 mx-auto opacity-40" />
                    <p className="my-3">No favorites yet.</p>
                    <Link href="/Shop" className="btn btn-primary">Discover Products</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {favoriteProducts.map((product: any) => (
                      <motion.div whileHover={{ y: -4 }} key={product.id} className="border rounded-xl p-3">
                        <Image src={product.image_urls?.[0]} alt={product.title} width={300} height={300} className="w-full h-40 object-cover rounded" />
                        <h4 className="font-medium mt-2 line-clamp-2">{product.title}</h4>
                        <div className="flex gap-2 mt-3">
                          <button className="btn btn-sm btn-primary flex-1" onClick={() => addFavoriteToCart(product)}>Add to Cart</button>
                          <button className="btn btn-sm btn-ghost" onClick={() => removeFavorite(product)}><Heart className="w-4 h-4 fill-current" /></button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">Profile</h3>
                    <input type="file" className="file-input file-input-bordered" accept="image/*" onChange={(e) => uploadAvatar(e.target.files?.[0])} />
                    <input className="input input-bordered" placeholder="First name" value={profileData.firstname} onChange={(e) => setProfileData((p) => ({ ...p, firstname: e.target.value }))} />
                    <input className="input input-bordered" placeholder="Last name" value={profileData.lastname} onChange={(e) => setProfileData((p) => ({ ...p, lastname: e.target.value }))} />
                    <input className="input input-bordered" placeholder="Phone" value={profileData.phone} onChange={(e) => setProfileData((p) => ({ ...p, phone: e.target.value }))} />
                    <input className="input input-bordered" value={user?.email || ""} readOnly />
                    <button className="btn btn-primary" onClick={handleProfileUpdate} disabled={isSaving}>{isSaving ? "Saving..." : "Save"}</button>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">Password</h3>
                    <input type="password" className="input input-bordered" placeholder="Current password" value={passwordData.currentPassword} onChange={(e) => setPasswordData((p) => ({ ...p, currentPassword: e.target.value }))} />
                    <input type="password" className="input input-bordered" placeholder="New password" value={passwordData.newPassword} onChange={(e) => setPasswordData((p) => ({ ...p, newPassword: e.target.value }))} />
                    <input type="password" className="input input-bordered" placeholder="Confirm new password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData((p) => ({ ...p, confirmPassword: e.target.value }))} />
                    <button className="btn btn-primary" onClick={handlePasswordUpdate}>Update Password</button>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title">Preferences</h3>
                    <label className="label cursor-pointer"><span>Theme</span><input type="checkbox" className="toggle" checked={theme === "dark"} onChange={toggleTheme} /></label>
                    <label className="label cursor-pointer"><span>Email notifications</span><input type="checkbox" className="toggle" checked={preferences.emailNotifications} onChange={(e) => setPreferences((p) => ({ ...p, emailNotifications: e.target.checked }))} /></label>
                    <label className="label cursor-pointer"><span>Newsletter</span><input type="checkbox" className="toggle" checked={preferences.newsletter} onChange={(e) => setPreferences((p) => ({ ...p, newsletter: e.target.checked }))} /></label>
                  </div>
                </div>

                <div className="card border border-error">
                  <div className="card-body">
                    <h3 className="card-title text-error">Danger Zone</h3>
                    <button className="btn btn-outline"><LogOut className="w-4 h-4" /> Log Out of All Devices</button>
                    <a className="btn btn-outline btn-error" href={`mailto:${process.env.NEXT_PUBLIC_APP_URL || ""}?subject=Account deletion request`}><Trash2 className="w-4 h-4" /> Request Account Deletion</a>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

const EnhancedDashboard = () => {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
};

export default EnhancedDashboard;