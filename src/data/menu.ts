export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Chicken Tikka Wrap',
    description: 'Juicy chicken tikka chunks with mint yogurt and pickled onions in a soft paratha.',
    price: 450,
    category: 'Wraps',
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '2',
    name: 'Seekh Kabab Wrap',
    description: 'Traditional beef seekh kababs rolled with imli chutney and fresh salad.',
    price: 550,
    category: 'Wraps',
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '3',
    name: 'Paneer Tikka Wrap',
    description: 'Grilled cottage cheese with bell peppers and spicy mayo.',
    price: 400,
    category: 'Wraps',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fbcd188398d8?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '4',
    name: 'Toss 8 Signature Salad',
    description: 'A vibrant mix of seasonal greens, chickpeas, pomegranate, and our house dressing.',
    price: 650,
    category: 'Salads',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '5',
    name: 'Grilled Chicken Salad',
    description: 'Lemon-herb chicken strips over a bed of fresh romaine and garden vegetables.',
    price: 750,
    category: 'Salads',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '6',
    name: 'Classic Caesar',
    description: 'Crisp romaine, parmesan cheese, and garlic croutons with Caesar dressing.',
    price: 600,
    category: 'Salads',
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '7',
    name: 'Mint Lemonade',
    description: 'Refreshing slush of fresh mint, lemon, and a hint of black salt.',
    price: 250,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '8',
    name: 'Mango Lassi',
    description: 'Traditional thick yogurt drink blended with sweet Alphonso mangoes.',
    price: 350,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1571006682858-a577452d1921?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '9',
    name: 'Cold Brew Coffee',
    description: 'Smooth 18-hour steeped coffee served over ice.',
    price: 450,
    category: 'Drinks',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb28b5a50dd2?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '10',
    name: 'Masala Fries',
    description: 'Hand-cut potato fries tossed in our secret spicy masala blend.',
    price: 280,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1630384066242-17a17833f347?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '11',
    name: 'Garlic Bread sticks',
    description: 'Baked to order with fresh garlic butter and herbs.',
    price: 320,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=800',
    available: true
  },
  {
    id: '12',
    name: 'Creamy Coleslaw',
    description: 'Shredded cabbage and carrots in a rich, tangy dressing.',
    price: 200,
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1572357176061-7c96fd2af22f?auto=format&fit=crop&q=80&w=800',
    available: true
  }
];
