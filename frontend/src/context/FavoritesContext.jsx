import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      api.get('/favorites')
        .then(res => setFavorites(res.data))
        .catch(() => {
          const stored = localStorage.getItem(`scenepass_favs_${user.id}`);
          if (stored) setFavorites(JSON.parse(stored));
        });
    } else {
      setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = async (item) => {
    if (!user) return false;

    const itemId = item._id || item.id;
    const isFav = favorites.some(f => f.itemId === itemId || f._id === itemId);

    let updated;
    if (isFav) {
      updated = favorites.filter(f => f.itemId !== itemId && f._id !== itemId);
    } else {
      const newItem = {
        _id: 'fav_' + Date.now(),
        itemId,
        itemType: item.category ? 'event' : 'movie',
        title: item.title,
        posterUrl: item.posterUrl || item.imageUrl,
        rating: item.rating || 4.5,
        category: item.genres ? item.genres.join(', ') : item.category || 'Entertainment'
      };
      updated = [newItem, ...favorites];
    }

    setFavorites(updated);
    localStorage.setItem(`scenepass_favs_${user.id}`, JSON.stringify(updated));

    try {
      await api.post('/favorites/toggle', {
        itemId,
        itemType: item.category ? 'event' : 'movie',
        title: item.title,
        posterUrl: item.posterUrl || item.imageUrl,
        rating: item.rating,
        category: item.genres ? item.genres[0] : item.category
      });
    } catch (err) {
      // Local storage handled fallback
    }

    return !isFav;
  };

  const isFavorite = (itemId) => {
    return favorites.some(f => f.itemId === itemId || f._id === itemId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
