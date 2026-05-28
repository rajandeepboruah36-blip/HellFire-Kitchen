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
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-05-28%20at%207.07.53%20PM%20%281%29-dLp5tJB87TM5E5i20r8nKLrH6BuLog.jpeg",
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
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&h=350&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&h=350&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500&h=350&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&h=350&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=500&h=350&fit=crop&q=80",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 119 }],
  },
  {
    id: "roll-chicken",
    name: "Chicken Roll",
    description: "Juicy chicken wrapped in a crispy roll with tangy sauce",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&h=350&fit=crop&q=80",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 99 }],
  },
  {
    id: "roll-paneer",
    name: "Paneer Roll",
    description: "Soft paneer with spices wrapped in a flaky roll",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=350&fit=crop&q=80",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 79 }],
    isVeg: true,
  },
  {
    id: "roll-veg",
    name: "Veg Roll",
    description: "Mixed vegetables with special seasoning in a crispy wrap",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&h=350&fit=crop&q=80",
    category: "Rolls",
    sizes: [{ size: "Regular", price: 49 }],
    isVeg: true,
  },
  {
    id: "roll-egg",
    name: "Egg Roll",
    description: "Fluffy eggs with onions and spices in a crispy roll",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=350&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=500&h=350&fit=crop&q=80",
    category: "HFK Special",
    sizes: [
      { size: "Half", price: 39 },
      { size: "Full", price: 79 },
    ],
    isVeg: true,
  },
  {
    id: "hfk-chicken-pakora-bbq",
    name: "Chicken Pakora with BBQ Sauce",
    description: "Crispy chicken pakoras served with smoky barbeque sauce",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&h=350&fit=crop&q=80",
    category: "HFK Special",
    sizes: [{ size: "Regular", price: 99 }],
  },
  {
    id: "hfk-crispy-pakora",
    name: "Crispy Chicken Pakora",
    description: "Crunchy chicken pakoras with special spices",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500&h=350&fit=crop&q=80",
    category: "HFK Special",
    sizes: [{ size: "Regular", price: 99 }],
  },
  {
    id: "hfk-biryani",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice layered with spiced chicken - Only on Wednesday",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&h=350&fit=crop&q=80",
    category: "HFK Special",
    sizes: [
      { size: "Half", price: 89 },
      { size: "Full", price: 179 },
    ],
    badge: "Wed Only",
  },

  // Snacks & Drinks
  {
    id: "snack-fries",
    name: "French Fries",
    description: "Golden crispy fries seasoned to perfection",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=350&fit=crop&q=80",
    category: "Snacks & Drinks",
    sizes: [
      { size: "Half", price: 49 },
      { size: "Full", price: 89 },
    ],
    isVeg: true,
  },
  {
    id: "snack-momo",
    name: "Crispy Chicken Fried Momo",
    description: "Crunchy fried momos filled with spiced chicken",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&h=350&fit=crop&q=80",
    category: "Snacks & Drinks",
    sizes: [
      { size: "Half", price: 49 },
      { size: "Full", price: 89 },
    ],
  },
  {
    id: "snack-spring-roll",
    name: "Veg Spring Roll",
    description: "Crispy rolls with vegetable filling - 6 pieces",
    image: "https://images.unsplash.com/photo-1548507200-b4d1e9a5e3a3?w=500&h=350&fit=crop&q=80",
    category: "Snacks & Drinks",
    sizes: [{ size: "6 pcs", price: 49 }],
    isVeg: true,
  },
  {
    id: "drink-coffee",
    name: "Coffee",
    description: "Hot brewed coffee to warm your soul",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=350&fit=crop&q=80",
    category: "Snacks & Drinks",
    sizes: [{ size: "Regular", price: 39 }],
    isVeg: true,
  },
  {
    id: "drink-cold-coffee",
    name: "Cold Coffee",
    description: "Chilled creamy coffee blend",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=350&fit=crop&q=80",
    category: "Snacks & Drinks",
    sizes: [{ size: "Regular", price: 49 }],
    isVeg: true,
  },

  // Soft Drinks
  {
    id: "soft-coke",
    name: "Coke",
    description: "Refreshing Coca-Cola",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&h=350&fit=crop&q=80",
    category: "Soft Drinks",
    sizes: [
      { size: "200ml", price: 20 },
      { size: "750ml", price: 45 },
    ],
    isVeg: true,
  },
  {
    id: "soft-pepsi",
    name: "Pepsi",
    description: "Chilled Pepsi cola",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&h=350&fit=crop&q=80",
    category: "Soft Drinks",
    sizes: [
      { size: "200ml", price: 20 },
      { size: "750ml", price: 45 },
    ],
    isVeg: true,
  },
  {
    id: "soft-sprite",
    name: "Sprite",
    description: "Lemon-lime refreshment",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&h=350&fit=crop&q=80",
    category: "Soft Drinks",
    sizes: [
      { size: "200ml", price: 20 },
      { size: "750ml", price: 45 },
    ],
    isVeg: true,
  },
];
