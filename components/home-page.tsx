import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] opacity-[0.07]">
            <Image
              src="/images/logo.png"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Logo Badge */}
          <div className="flex justify-center mb-10">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
              <Image
                src="/images/logo.png"
                alt="Hell Fire Kitchen"
                fill
                className="object-cover"
                priority
              />
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

          <Link href="/menu">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 font-bold group shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              Order Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
      </section>

      {/* Info Section */}
      <section className="py-24 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Visit Us Today
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Opening Hours */}
            <div className="p-8 lg:p-10 bg-background border border-border rounded-2xl text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Opening Hours
              </h3>
              <p className="text-3xl lg:text-4xl font-bold text-foreground">1PM - 10PM</p>
              <p className="text-sm text-muted-foreground mt-3">Open Daily</p>
            </div>

            {/* Delivery Area */}
            <div className="p-8 lg:p-10 bg-background border border-border rounded-2xl text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Delivery Area
              </h3>
              <p className="text-3xl lg:text-4xl font-bold text-foreground">Namrup</p>
              <p className="text-sm text-muted-foreground mt-3">
                & surrounding areas within 10km
              </p>
            </div>

            {/* Contact */}
            <div className="p-8 lg:p-10 bg-background border border-border rounded-2xl text-center group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Contact Us
              </h3>
              <a href="tel:9957798040" className="block text-2xl lg:text-3xl font-bold text-foreground hover:text-primary transition-colors">
                9957798040
              </a>
              <a href="tel:7099831305" className="block text-2xl lg:text-3xl font-bold text-foreground hover:text-primary transition-colors mt-1">
                7099831305
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[400px] h-[400px] opacity-[0.03]">
            <Image
              src="/images/logo.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Order?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Explore our menu and get your favorite dishes delivered hot and fresh to your doorstep.
          </p>
          <Link href="/menu">
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              View Full Menu
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
