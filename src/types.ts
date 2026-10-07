export interface MenuItem {
  id: string;
  name: string;
  category: 'Broasts' | 'Sandwiches' | 'Burgers' | 'Rolls' | 'BBQ Rolls' | 'Biryani' | 'Pulao' | 'BBQ Items' | 'Chicken Wings' | 'Chicken Nuggets' | 'Sauces & Dips' | 'Combos';
  price: number;
  description?: string;
  image: string;
  popular?: boolean;
  spicyLevel?: number; // 1-3
  portion?: string;
}

export interface ComboItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  items: string[];
  image: string;
  popularTag?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  dishName?: string;
  verified?: boolean;
  likes?: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface OrderConfirmation {
  orderId: string;
  customerName: string;
  address: string;
  notes?: string;
  items: CartItem[];
  totalAmount: number;
  placedAt: string;
  estimatedTime: string;
}
