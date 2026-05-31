"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, ChevronRight, Star } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (!name || !comment) {
      alert("Please fill all fields!");
      return;
    }
    setSubmitting(true);
    await supabase.from("reviews").insert([{ customer_name: name, rating, comment }]);
    setSubmitting(false);
    setSuccess(true);
    setName("");
    setComment("");
    setRating(5);
    setShowForm(false);
    fetchReviews();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] opacity-[0.07]">
            <Image src="/images/logo.png" alt="" fill className="object-contain" priority />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="flex justify-center mb-10">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
              <Image src="/images/logo.png" alt="Hell Fire Kitchen" fill className="object-cover" priority />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 tracking-tight">
            <span className="text-balance">Hell Fire</span>
            <span className="block text-primary">Kitchen</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium mb-4 tracking-wide">
            Taste the Fire, Feel the Flavor
          </p>

          <p className="text-sm sm:text-base text-primary/80 font-medium mb-12 tracking-widest uppercase">
            Hot Food. Bold Flavor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/menu">
              <Button size="lg" className="text-lg px-10 py-7 font-bold group shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                Order Now
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/checkout">
              <Button size="lg" variant="outline" className="text-lg px-10 py-7 font-bold border-primary text-primary hover:bg-primary hover:text-white transition-all">
                📦 Track Order
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
      </section>

      {/* Info Section */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Visit Us Today</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="p-8 lg:p-10 bg-background border border-border rounded-2xl text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Opening Hours</h3>
              <p className="text-3xl lg:text-4xl font-bold text-foreground">1PM - 10PM</p>
              <p className="text-sm text-muted-foreground mt-3">Open Daily</p>
            </div>

            <div className="p-8 lg:p-10 bg-background border border-border rounded-2xl text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Delivery Area</h3>
              <p className="text-3xl lg:text-4xl font-bold text-foreground">Namrup</p>
              <p className="text-sm text-muted-foreground mt-3">& surrounding areas within 10km</p>
            </div>

            <div className="p-8 lg:p-10 bg-background border border-border rounded-2xl text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contact Us</h3>
              <a href="tel:9957798040" className="block text-2xl lg:text-3xl font-bold text-foreground hover:text-primary transition-colors">9957798040</a>
              <a href="tel:7099831305" className="block text-2xl lg:text-3xl font-bold text-foreground hover:text-primary transition-colors mt-1">7099831305</a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Customer Reviews</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />

            {success && (
              <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm max-w-md mx-auto">
                ✅ Thank you for your review!
              </div>
            )}

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              ⭐ Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showForm && (
            <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-6 mb-12">
              <h3 className="font-bold text-lg text-foreground mb-4">Your Review</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground"
                />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Rating</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setRating(star)}>
                        <Star className={`h-8 w-8 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-background border border-border rounded-lg text-foreground"
                />
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-foreground">{review.customer_name}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[400px] h-[400px] opacity-[0.03]">
            <Image src="/images/logo.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">Ready to Order?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Explore our menu and get your favorite dishes delivered hot and fresh to your doorstep.
          </p>
          <Link href="/menu">
            <Button size="lg" className="text-lg px-10 py-7 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
              View Full Menu
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
