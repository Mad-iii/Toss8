export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available: boolean;
  featured?: boolean;
  formula?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // Wok Dishes
  {
    id: 'wok1',
    name: 'Toss8 Signature Wok Chicken',
    description: 'High-heat wok charred chicken tossed in our secret Reaction Sauce with snap peas and sesame.',
    price: 620,
    category: 'Wok Dishes',
    imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800',
    available: true,
    featured: true,
    formula: 'F-001'
  },
  {
    id: 'wok2',
    name: 'Sichuan Thunder Beef',
    description: 'Tender beef strips in a numbing peppercorn explosion. The ultimate spicy reaction.',
    price: 750,
    category: 'Wok Dishes',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'F-002'
  },
  {
    id: 'wok3',
    name: 'Kung Pao Reload',
    description: 'A classic recalculated: roasted peanuts, dried chilies, and tangy glazed chicken.',
    price: 580,
    category: 'Wok Dishes',
    imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'F-003'
  },
  {
    id: 'wok4',
    name: 'Garlic Butter Prawn Wok',
    description: 'Succulent prawns fused with roasted garlic and premium butter. Smooth chemistry.',
    price: 890,
    category: 'Wok Dishes',
    imageUrl: 'https://images.unsplash.com/photo-1559737558-2f5a35f4520b?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'F-004'
  },
  // Loaded Fries
  {
    id: 'fries1',
    name: 'Toss8 Original Fries',
    description: 'Double-fried hand-cut fries with our signature salt blend.',
    price: 350,
    category: 'Loaded Fries',
    imageUrl: 'https://images.unsplash.com/photo-1630384066242-17a17833f347?auto=format&fit=crop&q=80&w=800',
    available: true,
    featured: true,
    formula: 'F-101'
  },
  {
    id: 'fries2',
    name: 'Volcano Fries',
    description: 'Lava cheese blend meets spicy sriracha and jalapeño shrapnel.',
    price: 450,
    category: 'Loaded Fries',
    imageUrl: 'https://images.unsplash.com/photo-1585109641775-866fe492572b?auto=format&fit=crop&q=80&w=800',
    available: true,
    featured: true,
    formula: 'F-102'
  },
  {
    id: 'fries3',
    name: 'Cheesy Wok Fries',
    description: 'Smothered in a proprietary liquid cheese formula and scallions.',
    price: 480,
    category: 'Loaded Fries',
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'F-103'
  },
  {
    id: 'fries4',
    name: 'BBQ Smash Fries',
    description: 'Crispy fries topped with smokey BBQ reduction and fried onions.',
    price: 420,
    category: 'Loaded Fries',
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'F-104'
  },
  // Deals
  {
    id: 'deal1',
    name: 'The Chemistry Set',
    description: 'Signature Wok Chicken + Original Fries + Lemonade. The perfect compound.',
    price: 1100,
    category: 'Deals',
    imageUrl: 'https://images.unsplash.com/photo-1513442542250-854d436a73f2?auto=format&fit=crop&q=80&w=800',
    available: true,
    featured: true,
    formula: 'SET-01'
  },
  {
    id: 'deal2',
    name: 'Double Reaction Deal',
    description: 'Any 2 Wok Dishes + Any 2 Drinks. Massive energy.',
    price: 1800,
    category: 'Deals',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'SET-02'
  },
  // Drinks
  {
    id: 'drink1',
    name: 'Citrus Shock Lemonade',
    description: 'Fresh lemon juice electrified with mint and a hint of ginger.',
    price: 220,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'D-201'
  },
  {
    id: 'drink2',
    name: 'Mango Fusion Soda',
    description: 'Pure mango nectar fused with sparkling bubbles.',
    price: 250,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1571006682858-a577452d1921?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'D-202'
  },
  // Sides
  {
    id: 'side1',
    name: 'Steamed Jasmine Rice',
    description: 'Fragrant long-grain rice, steamed to perfection.',
    price: 150,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'S-301'
  },
  {
    id: 'side2',
    name: 'Garlic Butter Bread',
    description: 'Wok-toasted bread with roasted garlic slurry.',
    price: 180,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=800',
    available: true,
    formula: 'S-302'
  }
];
