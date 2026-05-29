"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, Settings } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
              <Image
                src="/images/logo.png"
                alt="Hell Fire Kitchen Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl text-foreground tracking-tight">
                Hell Fire Kitchen
              </span>
              <span className="block text-xs text-primary/80 -mt-1">
                Hot Food. Bold Flavor.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Menu
            </Link>
            <Link
              href="/auth"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
            >
              <Settings className="h-4 w-4" />
              Admin
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="relative border-primary/30 hover:border-primary">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/menu">
              <Button variant="outline" size="sm" className="relative border-primary/30">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/auth"
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/admin"
                className="text-muted-foreground hover:text-primary transition-colors px-2 py-2 font-medium flex items-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
