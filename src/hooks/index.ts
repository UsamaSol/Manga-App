import { useState, useEffect } from 'react';
import { Manga } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Manga[]>([]);

  const toggleFavorite = (manga: Manga) => {
    setFavorites(prev => 
      prev.some(m => m.id === manga.id)
        ? prev.filter(m => m.id !== manga.id)
        : [...prev, manga]
    );
  };

  return { favorites, toggleFavorite };
};