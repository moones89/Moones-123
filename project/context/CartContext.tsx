import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '@/types';

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNote: (id: string, note: string) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  clearCart: () => void;
  itemCount: number;
}

// Create default context
export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  updateNote: () => {},
  getSubtotal: () => 0,
  getTotal: () => 0,
  clearCart: () => {},
  itemCount: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await (window && window.localStorage ? Promise.resolve(window.localStorage.getItem('APP_CART')) : Promise.resolve(null));
        if (stored) setCartItems(JSON.parse(stored));
      } catch (e) {
        // fallback for native
        try {
          const asyncStored = await (await import('@react-native-async-storage/async-storage')).default.getItem('APP_CART');
          if (asyncStored) setCartItems(JSON.parse(asyncStored));
        } catch (err) {
          // TODO: Replace with production error reporting (e.g., Sentry)
          console.log('Failed to load cart:', err);
        }
      }
    })();
  }, []);

  // Save cart to AsyncStorage/localStorage on change
  useEffect(() => {
    (async () => {
      try {
        if (window && window.localStorage) {
          window.localStorage.setItem('APP_CART', JSON.stringify(cartItems));
        }
      } catch (e) {
        // fallback for native
        try {
          const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
          await AsyncStorage.setItem('APP_CART', JSON.stringify(cartItems));
        } catch (err) {
          // TODO: Replace with production error reporting (e.g., Sentry)
          console.log('Failed to save cart:', err);
        }
      }
    })();
  }, [cartItems]);

  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(count);
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    if (item.quantity <= 0) {
      // Optionally show user feedback here
      return;
    }
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity + item.quantity) } : i
        );
      }
      return [{ ...item, quantity: Math.max(1, item.quantity) }, ...prev];
    });
  };


  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateNote = (id: string, note: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, note } : item
      )
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    const discount = subtotal * 0.05;
    const shipping = 5;
    return subtotal - discount + shipping;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNote,
        getSubtotal,
        getTotal,
        clearCart,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
