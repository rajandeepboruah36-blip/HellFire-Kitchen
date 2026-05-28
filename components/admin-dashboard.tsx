"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Flame,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
  ChefHat,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  customerName: string;
  items: string;
  price: number;
  status: "Pending" | "Preparing" | "Delivered";
  time: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "Rahul Sharma",
    items: "Pork Fried Rice x2, Coke x2",
    price: 380,
    status: "Pending",
    time: "2 mins ago",
  },
  {
    id: "ORD002",
    customerName: "Priya Das",
    items: "Chicken Chowmein, Egg Roll x2",
    price: 260,
    status: "Preparing",
    time: "15 mins ago",
  },
  {
    id: "ORD003",
    customerName: "Amit Gogoi",
    items: "Veg Fried Rice, French Fries, Coke",
    price: 210,
    status: "Preparing",
    time: "25 mins ago",
  },
  {
    id: "ORD004",
    customerName: "Neha Bora",
    items: "Baba Roll x3, Chicken Roll x2",
    price: 360,
    status: "Delivered",
    time: "1 hour ago",
  },
  {
    id: "ORD005",
    customerName: "Sanjay Hazarika",
    items: "Pork Chowmein x2, Paneer Roll x2",
    price: 400,
    status: "Delivered",
    time: "2 hours ago",
  },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Orders", active: false },
  { icon: Settings, label: "Settings", active: false },
];

function StatusBadge({ status }: { status: Order["status"] }) {
  const statusConfig = {
    Pending: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-500",
      icon: Clock,
    },
    Preparing: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      icon: ChefHat,
    },
    Delivered: {
      bg: "bg-green-500/10",
      text: "text-green-500",
      icon: CheckCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const stats = {
    pending: orders.filter((o) => o.status === "Pending").length,
    preparing: orders.filter((o) => o.status === "Preparing").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    total: orders.reduce((acc, o) => acc + o.price, 0),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <Flame className="h-8 w-8 text-sidebar-primary" />
              <span className="font-bold text-lg text-sidebar-foreground">
                Admin Panel
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground lg:text-2xl">
              Orders Dashboard
            </h1>
            <div className="w-10 lg:hidden" />
          </div>
        </header>

        {/* Dashboard Content */}
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
              <p className="text-2xl font-bold text-primary">&#8377;{stats.total}</p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Recent Orders</h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Items
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0">
                      <td className="p-4 text-sm font-medium text-foreground">
                        {order.id}
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-foreground">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">
                        {order.items}
                      </td>
                      <td className="p-4 text-sm font-bold text-primary">
                        &#8377;{order.price}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="p-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as Order["status"])
                          }
                          className="bg-background border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border">
              {orders.map((order) => (
                <div key={order.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.id} • {order.time}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{order.items}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-primary">&#8377;{order.price}</p>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as Order["status"])
                      }
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
          </div>
        </main>
      </div>

      {/* Mobile sidebar close button */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="fixed top-4 right-4 z-50 p-2 bg-background rounded-full lg:hidden"
        >
          <X className="h-6 w-6 text-foreground" />
        </button>
      )}
    </div>
  );
}
