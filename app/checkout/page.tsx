"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = "/auth";
        return;
      }
      setChecking(false);

      const savedOrderId = localStorage.getItem("lastOrderId");
      const savedTime = localStorage.getItem("lastOrderTime");
      if (savedOrderId && savedTime) {
        const hoursPassed = (Date.now() - parseInt(savedTime)) / (1000 * 60 * 60);
        if (hoursPassed < 3) {
          setOrderId(savedOrderId);
        } else {
          localStorage.removeItem("lastOrderId");
          localStorage.removeItem("lastOrderTime");
        }
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields!");
      return;
    }
    setLoading(true);
    setError("");

    const { data, error: dbError } = await supabase.from("orders").insert([
      {
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        items: "Order from app",
        price: 0,
        status: "Pending",
      },
    ]).select();

    if (dbError) {
      setError("Failed to save order: " + dbError.message);
      setLoading(false);
      return;
    }

    const newOrderId = data[0].id;
    localStorage.setItem("lastOrderId", newOrderId);
    localStorage.setItem("lastOrderTime", Date.now().toString());
    setOrderId(newOrderId);

    const whatsappMessage = `New Order from Hell Fire Kitchen!
Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}`;
    const whatsappURL = `https://wa.me/919957798040?text=${encodeURIComponent(whatsappMessage)}`;
    setLoading(false);
    window.open(whatsappURL, "_blank");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-orange-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (orderId) {
    return <OrderStatus orderId={orderId} onNewOrder={() => {
      localStorage.removeItem("lastOrderId");
      localStorage.removeItem("lastOrderTime");
      setOrderId(null);
    }} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Checkout</h1>
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900 text-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}
        <input
          className="w-full p-3 bg-gray-800 rounded-lg"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-3 bg-gray-800 rounded-lg"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <textarea
          className="w-full p-3 bg-gray-800 rounded-lg"
          placeholder="Delivery Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-4 bg-orange-500 rounded-lg font-bold text-lg"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

function OrderStatus({ orderId, onNewOrder }: { orderId: string; onNewOrder: () => void }) {
  const [status, setStatus] = useState("Pending");
  const [customerName, setCustomerName] = useState("");

  const fetchStatus = async () => {
    const { data } = await supabase
      .from("orders")
      .select("status, customer_name")
      .eq("id", orderId)
      .single();
    if (data) {
      setStatus(data.status);
      setCustomerName(data.customer_name);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusStep = () => {
    if (status === "Pending") return 1;
    if (status === "Preparing") return 2;
    if (status === "Out for Delivery") return 3;
    if (status === "Delivered") return 4;
    return 1;
  };

  const steps = ["Pending", "Preparing", "On Way", "Delivered"];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-2">Your Order</h1>
      {customerName && (
        <p className="text-gray-400 mb-6">Hi {customerName}! 👋</p>
      )}

      <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-700">
        <p className="text-gray-400 text-sm mb-1">Current Status</p>
        <p className={`text-2xl font-bold ${
          status === "Pending" ? "text-yellow-500" :
          status === "Preparing" ? "text-blue-500" :
          status === "Out for Delivery" ? "text-orange-500" :
          "text-green-500"
        }`}>
          {status === "Pending" && "⏳ Order Received"}
          {status === "Preparing" && "👨‍🍳 Being Prepared"}
          {status === "Out for Delivery" && "🛵 Out for Delivery"}
          {status === "Delivered" && "✅ Delivered!"}
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-700">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                getStatusStep() >= index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-400"
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs text-center ${
                getStatusStep() >= index + 1
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-700 rounded-full">
          <div
            className="absolute h-2 bg-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${((getStatusStep() - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-gray-500 text-sm text-center mb-6">
        Updates automatically every 10 seconds
      </p>

      <button
        onClick={onNewOrder}
        className="w-full p-4 bg-orange-500 rounded-lg font-bold text-lg mb-4"
      >
        {status === "Delivered" ? "Place New Order 🔥" : "Order More Items 🛒"}
      </button>

      <a href="/" className="block text-center text-gray-400 hover:text-white">
        ← Back to Home
      </a>
    </div>
  );
}
