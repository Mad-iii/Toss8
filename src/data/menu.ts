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

const getImagePath = (name: string) => `/images/${name.replace(/\s+/g, '_')}.jpg`;

export const MENU_ITEMS: MenuItem[] = [
  // Wok Tossed Chicken with Fries
  {
    id: 'wtcf-1',
    name: 'Toss8 Chili Chicken & Fries',
    description: 'Tossed chicken with fries in a spicy chilli glaze.',
    price: 1050,
    category: 'Wok Tossed Chicken with Fries',
    imageUrl: getImagePath('Toss8 Chili Chicken & Fries'),
    available: true,
    featured: true,
    formula: 'F-101'
  },
  {
    id: 'wtcf-2',
    name: 'Hot Garlic Chicken & Fries',
    description: 'Chicken & fries coated in bold garlic sauce.',
    price: 1050,
    category: 'Wok Tossed Chicken with Fries',
    imageUrl: getImagePath('Hot Garlic Chicken & Fries'),
    available: true,
    formula: 'F-102'
  },
  {
    id: 'wtcf-3',
    name: 'Kung Pao Chicken & Fries',
    description: 'Sweet spicy chicken & fries with light crunch.',
    price: 1050,
    category: 'Wok Tossed Chicken with Fries',
    imageUrl: getImagePath('Kung Pao Chicken & Fries'),
    available: true,
    formula: 'F-103'
  },
  {
    id: 'wtcf-4',
    name: 'TOSS8 Manchurian Chicken & Fries',
    description: 'Classic Manchurian chicken & fries.',
    price: 1050,
    category: 'Wok Tossed Chicken with Fries',
    imageUrl: getImagePath('TOSS8 Manchurian Chicken & Fries'),
    available: true,
    formula: 'F-104'
  },
  {
    id: 'wtcf-5',
    name: 'Dynamite Chicken & Fries',
    description: 'Crispy chicken & fries in creamy spicy sauce.',
    price: 1200,
    category: 'Wok Tossed Chicken with Fries',
    imageUrl: getImagePath('Dynamite Chicken & Fries'),
    available: true,
    featured: true,
    formula: 'F-105'
  },
  // Wok Tossed Beef
  {
    id: 'wtb-1',
    name: 'Beef Chilli Dry & Fries',
    description: 'Wok tossed beef with bold chilli heat.',
    price: 1250,
    category: 'Wok Tossed Beef',
    imageUrl: getImagePath('Beef Chilli Dry & Fries'),
    available: true,
    formula: 'F-201'
  },
  {
    id: 'wtb-2',
    name: 'Hendry Beef & Fries',
    description: 'Savory wok tossed beef with fries.',
    price: 1250,
    category: 'Wok Tossed Beef',
    imageUrl: getImagePath('Hendry Beef & Fries'),
    available: true,
    formula: 'F-202'
  },
  {
    id: 'wtb-3',
    name: 'Beef Chilli Dry with Garlic Rice',
    description: 'Chilli beef paired with garlic sticky rice.',
    price: 1250,
    category: 'Wok Tossed Beef',
    imageUrl: getImagePath('Beef Chilli Dry with Garlic Rice'),
    available: true,
    formula: 'F-203'
  },
  {
    id: 'wtb-4',
    name: 'Hendry Beef with Garlic Rice',
    description: 'Balanced hendry flavor served with sticky rice.',
    price: 1250,
    category: 'Wok Tossed Beef',
    imageUrl: getImagePath('Hendry Beef with Garlic Rice'),
    available: true,
    formula: 'F-204'
  },
  // Wok Tossed Noodles
  {
    id: 'wtn-1',
    name: 'Chicken Noodles',
    description: 'Chicken noodles served with 2 pieces of dumplings.',
    price: 1150,
    category: 'Wok Tossed Noodles',
    imageUrl: getImagePath('Chicken Noodles'),
    available: true,
    formula: 'F-301'
  },
  {
    id: 'wtn-2',
    name: 'Szechuan Noodles',
    description: 'Spicy noodles with 2 pieces of wings.',
    price: 1150,
    category: 'Wok Tossed Noodles',
    imageUrl: getImagePath('Szechuan Noodles'),
    available: true,
    formula: 'F-302'
  },
  {
    id: 'wtn-3',
    name: 'Chili Noodles',
    description: 'Chilli noodles served with 3 pieces of wings.',
    price: 1300,
    category: 'Wok Tossed Noodles',
    imageUrl: getImagePath('Chili Noodles'),
    available: true,
    featured: true,
    formula: 'F-303'
  },
  // Wok Tossed Chicken With Sticky Rice
  {
    id: 'wtcr-1',
    name: 'Hendry Chicken',
    description: 'Served with sticky rice, slightly sweet and balanced.',
    price: 1100,
    category: 'Wok Tossed Chicken With Sticky Rice',
    imageUrl: getImagePath('Hendry Chicken'),
    available: true,
    formula: 'F-401'
  },
  {
    id: 'wtcr-2',
    name: 'Chicken Chili Dry',
    description: 'Served with sticky rice, slightly sweet and balanced.',
    price: 1100,
    category: 'Wok Tossed Chicken With Sticky Rice',
    imageUrl: getImagePath('Chicken Chili Dry'),
    available: true,
    formula: 'F-402'
  },
  {
    id: 'wtcr-3',
    name: 'TOSS8 Special Chicken',
    description: 'Signature flavor profile, served with sticky rice.',
    price: 1100,
    category: 'Wok Tossed Chicken With Sticky Rice',
    imageUrl: getImagePath('TOSS8 Special Chicken'),
    available: true,
    featured: true,
    formula: 'F-403'
  },
  {
    id: 'wtcr-4',
    name: 'Chicken Manchurian',
    description: 'Manchurian chicken paired with garlic sticky rice.',
    price: 1100,
    category: 'Wok Tossed Chicken With Sticky Rice',
    imageUrl: getImagePath('Chicken Manchurian'),
    available: true,
    formula: 'F-404'
  },
  {
    id: 'wtcr-5',
    name: 'Kung Pao Chicken',
    description: 'Sweet spicy chicken with garlic sticky rice.',
    price: 1200,
    category: 'Wok Tossed Chicken With Sticky Rice',
    imageUrl: getImagePath('Kung Pao Chicken'),
    available: true,
    formula: 'F-405'
  },
  // Wok Tossed Wings
  {
    id: 'wtw-1',
    name: 'Hot Garlic Wings',
    description: 'Garlic flavored wings with mild spice. (6 pieces)',
    price: 950,
    category: 'Wok Tossed Wings',
    imageUrl: getImagePath('Hot Garlic Wings'),
    available: true,
    formula: 'F-501'
  },
  {
    id: 'wtw-2',
    name: 'Toss8 Chili Wings',
    description: 'Spicy, saucy and fully coated. (6 pieces)',
    price: 950,
    category: 'Wok Tossed Wings',
    imageUrl: getImagePath('Toss8 Chili Wings'),
    available: true,
    formula: 'F-502'
  },
  {
    id: 'wtw-3',
    name: 'Tamarind Wings',
    description: 'Tangy glaze with slight sweetness. (6 pieces)',
    price: 950,
    category: 'Wok Tossed Wings',
    imageUrl: getImagePath('Tamarind Wings'),
    available: true,
    formula: 'F-503'
  },
  // Wok Tossed Dumplings
  {
    id: 'wtd-1',
    name: 'Kung Pao Dumplings',
    description: 'Wok tossed sweet and spicy.',
    price: 1050,
    category: 'Wok Tossed Dumplings',
    imageUrl: getImagePath('Kung Pao Dumplings'),
    available: true,
    formula: 'F-601'
  },
  {
    id: 'wtd-2',
    name: 'TOSS8 Chilli Dumplings',
    description: 'Dumplings tossed in a light chilli glaze.',
    price: 1050,
    category: 'Wok Tossed Dumplings',
    imageUrl: getImagePath('TOSS8 Chilli Dumplings'),
    available: true,
    formula: 'F-602'
  },
  // Add Ons
  {
    id: 'ao-1',
    name: 'Dynamite Sauce',
    description: 'Creamy with a light spicy kick.',
    price: 100,
    category: 'Add Ons',
    imageUrl: getImagePath('Dynamite Sauce'),
    available: true,
    formula: 'AO-01'
  },
  {
    id: 'ao-2',
    name: 'House Mayo Sauce',
    description: 'Smooth, neutral, easy pairing.',
    price: 100,
    category: 'Add Ons',
    imageUrl: getImagePath('House Mayo Sauce'),
    available: true,
    formula: 'AO-02'
  },
  // Deals
  {
    id: 'deal-1',
    name: 'Deal 1 Chicken Combo',
    description: '1 Chicken With Fries + 1 Chicken with Sticky Rice + 1 Half Litre Drink',
    price: 2100,
    category: 'Deals',
    imageUrl: getImagePath('Deal 1 Chicken Combo'),
    available: true,
    featured: true,
    formula: 'DEAL-01'
  },
  {
    id: 'deal-2',
    name: 'Deal 2 Beef & Noodles Combo',
    description: '1 Wok Tossed Beef + 1 Wok Tossed Noodles + 1 Half Litre Drink',
    price: 2350,
    category: 'Deals',
    imageUrl: getImagePath('Deal 2 Beef & Noodles Combo'),
    available: true,
    formula: 'DEAL-02'
  },
  {
    id: 'deal-3',
    name: 'Deal 3 Ultimate Snack Combo',
    description: '1 Wok Tossed Noodles + 1 Bowl of Dumplings + 1 Wok Tossed Wings + 1 Litre Drink',
    price: 3050,
    category: 'Deals',
    imageUrl: getImagePath('Deal 3 Ultimate Snack Combo'),
    available: true,
    formula: 'DEAL-03'
  },
  {
    id: 'deal-4',
    name: 'Deal 4 Loaded Combo',
    description: '1 Chicken With Fries + 1 Chicken with Sticky Rice + 1 Wok Tossed Beef + 1 Litre Drink',
    price: 3300,
    category: 'Deals',
    imageUrl: getImagePath('Deal 4 Loaded Combo'),
    available: true,
    formula: 'DEAL-04'
  },
  {
    id: 'deal-5',
    name: 'Deal 5 Family Combo',
    description: '1 Chicken With Fries + 1 Chicken with Sticky Rice + 1 Wok Tossed Beef + 1 Bowl of Dumplings + 1.5 Litre Drink',
    price: 4350,
    category: 'Deals',
    imageUrl: getImagePath('Deal 5 Family Combo'),
    available: true,
    featured: true,
    formula: 'DEAL-05'
  },
  // Beverages
  {
    id: 'bev-1',
    name: 'Coke Classic',
    description: '1.5 Litre',
    price: 240,
    category: 'Beverages',
    imageUrl: getImagePath('Coke Classic'),
    available: true,
    formula: 'B-001'
  },
  {
    id: 'bev-2',
    name: 'Coke Zero Sugar',
    description: 'Can',
    price: 160,
    category: 'Beverages',
    imageUrl: getImagePath('Coke Zero Sugar'),
    available: true,
    formula: 'B-002'
  },
  {
    id: 'bev-3',
    name: 'Sprite',
    description: '1.5 Litre',
    price: 240,
    category: 'Beverages',
    imageUrl: getImagePath('Sprite'),
    available: true,
    formula: 'B-003'
  },
  {
    id: 'bev-4',
    name: 'Fanta',
    description: '1.5 Litre',
    price: 240,
    category: 'Beverages',
    imageUrl: getImagePath('Fanta'),
    available: true,
    formula: 'B-004'
  },
  {
    id: 'bev-5',
    name: 'Dasani Water',
    description: 'Large',
    price: 150,
    category: 'Beverages',
    imageUrl: getImagePath('Dasani Water'),
    available: true,
    formula: 'B-005'
  }
];

