// Common types used across the application

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  note?: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  description?: string;
  discount?: number;
  rating?: number;
  type?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
}

export interface Advertisement {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  distance?: string;
}

export interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  distance?: string;
  going?: string;
  description?: string;
  levels?: EventLevel[];
}

export interface EventLevel {
  id: number;
  name: string;
  price: number;
  description?: string;
}

// Navigation types
export type RootTabParamList = {
  index: undefined;
  events: undefined;
  supermarket: undefined;
  pharmacies: undefined;
  profile: undefined;
};

export type SupermarketStackParamList = {
  index: undefined;
  '[id]': { id: string };
  products: { category?: string };
};

export type PharmaciesStackParamList = {
  index: undefined;
  '[id]': { id: string };
};

export type EventsStackParamList = {
  index: undefined;
  '[id]': { id: string };
};

export type ProfileStackParamList = {
  index: undefined;
  settings: undefined;
  orders: undefined;
  favorites: undefined;
  addresses: undefined;
};