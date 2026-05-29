"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all fields!");
      return;
    }
    setLoading(true);

    await supabase.from("orders").insert([
      {
        customer_name: form.name,
        phone: form.phone,
        address: form.address,
        status: "Pending",
      },
    ]);

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
        <div className="text-center">
          <h2 className="text-xl text-green-500">Order Placed!</h2>
          <p className="text-gray-400 mt-2">We will contact you shortly!</p>
        </div>
      ) : (
        <div className="space-y-4">
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

      
