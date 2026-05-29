"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CheckoutPage() {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields!");
      return;
    }
    setLoading(true);
    setError("");

    const { error: dbError } = await supabase.from("orders").insert([
      {
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        items: "Order from app",
        price: 0,
        status: "Pending",
      },
    ]);

    if (dbError) {
      setError("Failed to save order: " + dbError.message);
      setLoading(false);
      return;
    }

    const whatsappMessage = `New Order from Hell Fire Kitchen!
Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}`;
    const whatsappURL = `https://wa.me/919957798040?text=${encodeURIComponent(whatsappMessage)}`;
    setSuccess(true);
    setLoading(false);
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-orange-500 mb-6">Checkout</h1>
      {success ? (
        <div className="text-center space-y-4">
          <h2 className="text-xl text-green-500">Order Placed! ✅</h2>
          <p className="text-gray-400 mt-2">We will contact you shortly!</p>
          <a
            href="/track"
            className="block w-full p-4 bg-orange-500 rounded-lg font-bold text-lg text-white text-center mt-4"
          >
            Track Your Order 📦
          </a>
          <a
            href="/"
            className="block text-gray-400 hover:text-white mt-2"
          >
            ← Back to Home
          </a>
        </div>
      ) : (
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
      )}
    </div>
  );
}
