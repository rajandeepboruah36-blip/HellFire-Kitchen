"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Flame } from "lucide-react";
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

export default function TrackPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async () => {
    if (!phone) {
      alert("Please enter your phone number!");
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("phone", phone)
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setSearched(true);
    setLoading(false);
  };

  const handleCancel = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    await supabase.from("orders").update({ status: "Cancelled" }).eq("id", orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
    );
  };

  const getStatusStep = (status: string) => {
    if (status === "Pending") return 1;
    if (status === "Preparing") return 2;
    if (status === "Out for Delivery") return 3;
    if (status === "Delivered") return 4;
    return 1;
  };

  const getStatusColor = (status: string) => {
    if (status === "Pending") return "text-yellow-500";
    if (status === "Preparing") return "text-blue-500";
    if (status === "Out for Delivery") return "text-orange-500";
    if (status === "Delivered") return "text-green-500";
    if (status === "Cancelled") return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center gap-3 mb-8">
        <Flame className="h-8 w-8 text-orange-500" />
        <h1 className="text-2xl font-bold text-orange-500">Track Your Order</h1>
      </div>

      <div className="space-y-4 mb-8">
        <input
          className="w-full p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
        />
        <button
          onClick={handleTrack}
          disabled={loading}
          className="w-full p-4 bg-orange-500 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
        >
          {loading ? "Searching..." : "Track Order"}
        </button>
      </div>

      {searched && orders.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          <p className="text-lg">No orders found for this phone number.</p>
          <p className="text-sm mt-2">Make sure you entered the correct number.</p>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="bg-gray-900 rounded-xl p-5 mb-4 border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-bold text-lg">{order.customer_name}</p>
              <p className="text-gray-400 text-sm">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <span className={`font-bold text-lg ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>

          {order.status !== "Cancelled" && (
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                {["Pending", "Preparing", "Out for Delivery", "Delivered"].map((step, index) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 ${
                      getStatusStep(order.status) >= index + 1
                        ? "bg-orange-500 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-xs text-center ${
                      getStatusStep(order.status) >= index + 1
                        ? "text-orange-500"
                        : "text-gray-500"
                    }`}>
                      {step === "Out for Delivery" ? "On Way" : step}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full">
                <div
                  className="absolute h-2 bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${((getStatusStep(order.status) - 1) / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {order.status === "Cancelled" && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-center">
              <p className="text-red-500 font-medium">This order has been cancelled</p>
            </div>
          )}

          {order.items && (
            <p className="text-gray-300 text-sm mb-2">🍽️ {order.items}</p>
          )}
          {order.price > 0 && (
            <p className="text-orange-500 font-bold">₹{order.price}</p>
          )}

          {order.status === "Pending" && (
            <button
              onClick={() => handleCancel(order.id)}
              className="mt-4 w-full py-2 bg-red-500/10 text-red-500 border border-red-500/30 rounded-lg font-medium hover:bg-red-500/20 transition-colors"
            >
              Cancel Order
            </button>
          )}
        </div>
      ))}

      <div className="mt-8 text-center">
        <Link href="/" className="text-orange-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
