"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Flame, LayoutDashboard, ShoppingBag, Settings, LogOut, Menu, X, Clock, ChefHat, CheckCircle,
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
  status: "Pending" | "Preparing" | "Delivered";
  created_at: string;
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const statusConfig = {
    Pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", icon: Clock },
    Preparing: { bg: "bg-blue-500/10", text: "text-blue-500", icon: ChefHat },
    Delivered: { bg: "bg-green-500/10", text: "text-green-500", icon: CheckCircle },
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
  const [activeTab, setActiveTab] = useState("Dashboard");

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    fetchOrders();
  };

  const stats = {
    pending: orders.filter((o) => o.status === "Pending").length,
    preparing: orders.filter((o) => o.status === "Preparing").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    total: orders.reduce((acc, o) => acc + (o.price || 0), 0),
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: ShoppingBag, label: "Orders" },
    { icon: Settings, label: "Settings" },
  ];

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
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Preparing</p>
              <p className="text-2xl font-bold text-blue-500">{stats.preparing}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Delivered</p>
              <p className="text-2xl font-bold text-green-500">{stats.delivered}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-primary">₹{stats.total}</p>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                {activeTab === "Orders" ? "All Orders" : "Recent Orders"}
              </h2>
              <button onClick={fetchOrders} className="text-sm text-orange-500 hover:underline">
                Refresh
              </button>
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
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                        className="bg-background border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
