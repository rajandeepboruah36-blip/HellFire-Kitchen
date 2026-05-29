import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src="/images/logo.png"
                alt="Hell Fire Kitchen"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-lg text-foreground">Hell Fire Kitchen</span>
              <span className="block text-xs text-muted-foreground">Hot Food. Bold Flavor.</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Menu
            </Link>
            <Link href="/auth" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Login
            </Link>
            <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Admin
            </Link>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-border" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hell Fire Kitchen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
