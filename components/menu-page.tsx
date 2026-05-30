"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { menuData, categories, MenuItem } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, X, Trash2, Star, Clock, MapPin } from "lucide-react";

function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart, items, updateQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);

  const cartItem = items.find(
    (i) => i.id === item.id && i.size === item.sizes[selectedSize].size
  );
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.sizes[selectedSize].price,
      category: item.category,
      size: item.sizes[selectedSize].size,
      image: item.image,
    });
  };

  const handleUpdateQuantity = (newQty: number) => {
    updateQuantity(`${item.id}-${item.sizes[selectedSize].size}`, newQty);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {item.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            {item.badge}
          </span>
        )}
        {item.isVeg && (
          <span className="absolute top-3 right-3 bg-green-500 p-1 rounded">
            <span className="block w-2 h-2 bg-white rounded-full" />
          </span>
        )}
        {!item.isVeg && (
          <span className="absolute top-3 right-3 bg-red-500 p-1 rounded">
            <span className="block w-2 h-2 bg-white rounded-full" />
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3 min-h-[40px]">
          {item.description}
        </p>

        {item.sizes.length > 1 && (
          <div className="flex gap-2 mb-3">
            {item.sizes.map((size, idx) => (
              <button
                key={size.size}
                onClick={() => setSelectedSize(idx)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  selectedSize === idx
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/50"
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            &#8377;{item.sizes[selectedSize].price}
          </span>

          {quantity === 0 ? (
            <Button
              size="sm"
              onClick={handleAdd}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-lg"
            >
              ADD
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-primary rounded-lg">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="p-2 text-primary-foreground hover:bg-primary/80 rounded-l-lg transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-primary-foreground font-semibold min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="p-2 text-primary-foreground hover:bg-primary/80 rounded-r-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      )}

      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-1">Add items to get started</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="bg-gray-50 rounded-xl p-4 flex gap-3">
                    {item.image && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                      <p className="text-gray-500 text-xs">{item.size}</p>
                      <p className="text-primary font-bold text-sm mt-1">&#8377;{item.price * item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeFromCart(`${item.id}-${item.size}`)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg">
                        <button className="p-1.5 hover:bg-gray-50 transition-colors rounded-l-lg" onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity - 1)}>
                          <Minus className="h-3 w-3 text-primary" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                        <button className="p-1.5 hover:bg-gray-50 transition-colors rounded-r-lg" onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity + 1)}>
                          <Plus className="h-3 w-3 text-primary" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-gray-100 bg-white space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold text-gray-900">&#8377;{totalPrice}</span>
                </div>
                <Button className="w-full h-12 text-base font-semibold rounded-xl" onClick={() => window.location.href='/checkout'}>
                  Proceed to Checkout
                </Button>
                <button onClick={clearCart} className="w-full text-center text-gray-500 text-sm hover:text-red-500 transition-colors">
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = sectionRefs.current[category];
    if (element) {
      const offset = 160;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const filteredItems = menuData.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-100 shrink-0">
              <Image src="/images/logo.png" alt="Hell Fire Kitchen" fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">Hell Fire Kitchen</h1>
              <p className="text-gray-500 text-sm mt-0.5">Chinese, Fast Food, Rolls, Biryani</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">4.2</span>
                  <span className="text-gray-400">{"(500+)"}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>25-30 min</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Namrup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <section ref={(el) => { sectionRefs.current[activeCategory] = el; }}>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {activeCategory}
            <span className="text-gray-400 font-normal text-base ml-2">
              ({filteredItems.length} items)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-30">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setCartOpen(true)}
              className="w-full bg-primary text-primary-foreground rounded-xl p-4 shadow-lg flex items-center justify-between hover:bg-primary/90 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-lg p-2">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <span className="font-semibold">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">&#8377;{totalPrice}</span>
                <span className="text-sm opacity-80">View Cart</span>
              </div>
            </button>
          </div>
        </div>
      )}

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  );
}
