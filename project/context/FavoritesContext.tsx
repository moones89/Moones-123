import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

const FAVORITES_STORAGE_KEY = 'APP_FAVORITES';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) setFavorites(JSON.parse(stored));
      } catch (err) {
        // TODO: Replace with production error reporting (e.g., Sentry)
        console.log('Failed to load favorites:', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (e) {
        // TODO: Replace with production error reporting (e.g., Sentry)
        console.log('Failed to save favorites:', e);
      }
    })();
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(fav => fav !== id);
      } else {
        return [id, ...prev];
      }
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
