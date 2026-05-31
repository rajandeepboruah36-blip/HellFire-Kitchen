"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Flame, LayoutDashboard, ShoppingBag, Settings, LogOut, Menu, X, Clock, ChefHat, CheckCircle, XCircle, Truck, Trash2, Star,
} from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Order {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  items: string;
  price: number;
  status: "Pending" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";
  created_at: string;
}

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const statusConfig = {
    Pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", icon: Clock },
    Preparing: { bg: "bg-blue-500/10", text: "text-blue-500", icon: ChefHat },
    "Out for Delivery": { bg: "bg-orange-500/10", text: "text-orange-500", icon: Truck },
    Delivered: { bg: "bg-green-500/10", text: "text-green-500", icon: CheckCircle },
    Cancelled: { bg: "bg-red-500/10", text: "text-red-500", icon: XCircle },
  };
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [restaurantName, setRestaurantName] = useState("HellFire Kitchen");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [saved, setSaved] = useState(false);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  useEffect(() => {
    fetchOrders();
    fetchReviews();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    fetchOrders();
  };

  const cancelOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      await supabase.from("orders").update({ status: "Cancelled" }).eq("id", orderId);
      fetchOrders();
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      await supabase.from("orders").delete().eq("id", orderId);
      fetchOrders();
    }
  };

  const deleteAllOrders = async () => {
    if (confirm("Are you sure you want to delete ALL orders? This cannot be undone!")) {
      await supabase.from("orders").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      fetchOrders();
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await supabase.from("reviews").delete().eq("id", reviewId);
      fetchReviews();
    }
  };

  const deleteAllReviews = async () => {
    if (confirm("Are you sure you want to delete ALL reviews? This cannot be undone!")) {
      await supabase.from("reviews").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      fetchReviews();
    }
  };

  const stats = {
    pending: orders.filter((o) => o.status === "Pending").length,
    preparing: orders.filter((o) => o.status === "Preparing").length,
    outForDelivery: orders.filter((o) => o.status === "Out for Delivery").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
    total: orders.reduce((acc, o) => acc + (o.price || 0), 0),
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: ShoppingBag, label: "Orders" },
    { icon: Star, label: "Reviews" },
    { icon: Settings, label: "Settings" },
  ];

  const handleSaveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const OrdersList = ({ title }: { title: string }) => (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={fetchOrders} className="text-sm text-orange-500 hover:underline">
            Refresh
          </button>
          <button onClick={deleteAllOrders} className="text-sm text-red-500 hover:underline flex items-center gap-1">
            <Trash2 className="h-3 w-3" />
            Delete All
          </button>
        </div>
      </div>
      {orders.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No orders yet. Orders will appear here when customers place them.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {orders.map((order) => (
            <div key={order.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{order.customer_name}</p>
                  <p className="text-xs text-muted-foreground">{order.phone}</p>
                  <p className="text-xs text-muted-foreground">{order.address}</p>
                  <p className="text-sm text-muted-foreground mt-1">{order.items}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={order.status} />
                  <button onClick={() => deleteOrder(order.id)} className="text-red-500 hover:text-red-400 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-orange-500 font-bold">₹{order.price}</p>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                    className="bg-background border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  {order.status !== "Cancelled" && order.status !== "Delivered" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <Flame className="h-8 w-8 text-sidebar-primary" />
              <span className="font-bold text-lg text-sidebar-foreground">Admin Panel</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.label
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-muted rounded-lg">
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground lg:text-2xl">{activeTab}</h1>
            <div className="w-10 lg:hidden" />
          </div>
        </header>

        <main className="p-4 lg:p-6">

          {activeTab === "Dashboard" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Preparing</p>
                  <p className="text-2xl font-bold text-blue-500">{stats.preparing}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Out for Delivery</p>
                  <p className="text-2xl font-bold text-orange-500">{stats.outForDelivery}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Delivered</p>
                  <p className="text-2xl font-bold text-green-500">{stats.delivered}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Cancelled</p>
                  <p className="text-2xl font-bold text-red-500">{stats.cancelled}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹{stats.total}</p>
                </div>
              </div>
              <OrdersList title="Recent Orders" />
            </>
          )}

          {activeTab === "Orders" && (
            <OrdersList title="All Orders" />
          )}

          {activeTab === "Reviews" && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Customer Reviews</h2>
                <div className="flex items-center gap-2">
                  <button onClick={fetchReviews} className="text-sm text-orange-500 hover:underline">
                    Refresh
                  </button>
                  <button onClick={deleteAllReviews} className="text-sm text-red-500 hover:underline flex items-center gap-1">
                    <Trash2 className="h-3 w-3" />
                    Delete All
                  </button>
                </div>
              </div>
              {reviews.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No reviews yet.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-foreground">{review.customer_name}</p>
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                            ))}
                          </div>
                        </div>
                        <button onClick={() => deleteReview(review.id)} className="text-red-500 hover:text-red-400 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-bold text-foreground">Restaurant Settings</h2>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Restaurant Name</label>
                <input
                  type="text"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <input
                  type="text"
                  value={restaurantPhone}
                  onChange={(e) => setRestaurantPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Address</label>
                <input
                  type="text"
                  value={restaurantAddress}
                  onChange={(e) => setRestaurantAddress(e.target.value)}
                  placeholder="Enter restaurant address"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={handleSaveSettings}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {saved ? "✅ Saved!" : "Save Settings"}
              </button>
            </div>
          )}

        </main>
      </div>

      {sidebarOpen && (
        <button onClick={() => setSidebarOpen(false)} className="fixed top-4 right-4 z-50 p-2 bg-background rounded-full lg:hidden">
          <X className="h-6 w-6 text-foreground" />
        </button>
      )}
    </div>
  );
}
