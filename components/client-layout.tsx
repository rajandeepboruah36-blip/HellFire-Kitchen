"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <CartProvider>{children}</CartProvider>;
  }

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="pt-16 flex-1">{children}</div>
        <Footer />
      </div>
    </CartProvider>
  );
}
