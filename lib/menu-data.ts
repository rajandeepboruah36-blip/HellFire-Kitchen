export interface MenuItemSize {
  size: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  sizes: MenuItemSize[];
  isVeg?: boolean;
  badge?: string;
}

export const categories = [
  "Fried Rice",
  "Chowmein",
  "Rolls",
  "HFK Special",
  "Snacks & Drinks",
  "Soft Drinks",
];

export const menuData: MenuItem[] = [
  // Fried Rice
  {
    id: "fr-pork",
    name: "Pork Fried Rice",
    description: "Aromatic fried rice with tender pork pieces, vegetables, and special sauces",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-28%20at%206.19.16%20PM-uZWbeQ09SymF28jXqpyUbO8laaK0JN.jpeg",
    category: "Fried Rice",
    sizes: [
      { size: "Half", price: 69 },
      { size: "Full", price: 140 },
    ],
  },
  {
    id: "fr-chicken",
    name: "Chicken Fried Rice",
    description: "Classic fried rice with juicy chicken chunks and fresh vegetables",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-28%20at%207.06.50%20PM-fGCzvY296O8RgtENWSCalrfzlda5ly.jpeg",
    category: "Fried Rice",
    sizes: [
      { size: "Half", price: 59 },
      { size: "Full", price: 120 },
    ],
  },
  {
    id: "fr-egg",
    name: "Egg Fried Rice",
    description: "Fluffy rice tossed with scrambled eggs and aromatic spices",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-28%20at%206.29.50%20PM%20%281%29-icbpnf9BZssw7lIytnTEsMXQt4j1va.jpeg",
    category: "Fried Rice",
    sizes: [
      { size: "Half", price: 49 },
      { size: "Full", price: 100 },
    ],
    isVeg: true,
  },
  {
    id: "fr-paneer",
    name: "Paneer Fried Rice",
    description: "Delicious fried rice with soft paneer cubes and mixed vegetables",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/paneer%20fried%20rice.jpeg",
    category: "Fried Rice",
    sizes: [
      { size: "Half", price: 69 },
      { size: "Full", price: 140 },
    ],
    isVeg: true,
  },
  {
    id: "fr-veg",
    name: "Veg Fried Rice",
    description: "Garden fresh vegetables stir-fried with fragrant rice",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-28%20at%207.08.59%20PM%20%281%29-7nvMUGgCz1XVogpCypLy4o03WbjfGb.jpeg",
    category: "Fried Rice",
    sizes: [
      { size: "Half", price: 49 },
      { size: "Full", price: 90 },
    ],
    isVeg: true,
  },

  // Chowmein
  {
    id: "cm-pork",
    name: "Pork Chowmein",
    description: "Stir-fried noodles with succulent pork and crunchy vegetables",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/Pork%20chowmein.jpeg",
    category: "Chowmein",
    sizes: [
      { size: "Half", price: 69 },
      { size: "Full", price: 140 },
    ],
  },
  {
    id: "cm-chicken",
    name: "Chicken Chowmein",
    description: "Savory noodles with tender chicken and fresh veggies",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/chicken%20chowmein.jpeg",
    category: "Chowmein",
    sizes: [
      { size: "Half", price: 59 },
      { size: "Full", price: 120 },
    ],
  },
  {
    id: "cm-egg",
    name: "Egg Chowmein",
    description: "Classic noodles tossed with scrambled eggs and vegetables",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/egg%20chowmein.jpeg",
    category: "Chowmein",
    sizes: [
      { size: "Half", price: 49 },
      { size: "Full", price: 100 },
    ],
    isVeg: true,
  },
  {
    id: "cm-veg",
    name: "Veg Chowmein",
    description: "Flavorful noodles with assorted garden vegetables",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/veg%20chowmein.jpeg",
    category: "Chowmein",
    sizes: [
      { size: "Half", price: 49 },
      { size: "Full", price: 90 },
    ],
    isVeg: true,
  },

  // Rolls
  {
    id: "roll-baba",
    name: "Baba Roll",
    description: "Our signature roll loaded with special filling and sauces",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&h=350&fit=crop&q=80",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 129 }],
    badge: "Bestseller",
  },
  {
    id: "roll-pork",
    name: "Pork Roll",
    description: "Crispy roll stuffed with seasoned pork and fresh vegetables",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/pork%20roll.jpeg",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 119 }],
  },
  {
    id: "roll-chicken",
    name: "Chicken Roll",
    description: "Juicy chicken wrapped in a crispy roll with tangy sauce",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/chicken%20roll.jpeg",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 99 }],
  },
  {
    id: "roll-paneer",
    name: "Paneer Roll",
    description: "Soft paneer with spices wrapped in a flaky roll",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/paneer%20roll.jpeg",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 79 }],
    isVeg: true,
  },
  {
    id: "roll-veg",
    name: "Veg Roll",
    description: "Mixed vegetables with special seasoning in a crispy wrap",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/veg%20roll.jpeg",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 49 }],
    isVeg: true,
  },
  {
    id: "roll-egg",
    name: "Egg Roll",
    description: "Fluffy eggs with onions and spices in a crispy roll",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/egg%20roll.jpeg",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 59 }],
    isVeg: true,
  },

  // HFK Special
  {
    id: "hfk-crispy-chicken",
    name: "Crispy Fried Chicken",
    description: "Golden crispy fried chicken pieces with our secret spice blend",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&h=350&fit=crop&q=80",
    category: "HFK Special",
    sizes: [
      { size: "Half (3 pcs)", price: 149 },
      { size: "Full (6 pcs)", price: 289 },
    ],
    badge: "Chef Special",
  },
  {
    id: "hfk-chilli-potato",
    name: "Chilli Potato",
    description: "Crispy potato fingers tossed in spicy chilli sauce",
    image: "https://oydsbelzsifpglrm.public.blob.vercel-storage.com/chilli%20potato.jpeg",
    category: "HFK Special",
    sizes: [
      { size: "Half", price: 39 },
      { size: "Full", pri
