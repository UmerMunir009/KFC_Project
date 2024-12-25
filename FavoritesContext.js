import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
  const safeItem = {
    name: item?.name || `Unnamed-${Date.now()}`,
    image: item?.image || 'https://via.placeholder.com/80',
    price: item?.price || 0,
    description:item?.description || "Delicious Food Item"
  };
  setFavorites((prevFavorites) => {
    if (prevFavorites.some((i) => i.name === safeItem.name)) {
      return prevFavorites; // Return the same array if item already exists
    }
    return [...prevFavorites, safeItem];
  });
};


  const removeFromFavorites = (item) => {
    setFavorites((prevFavorites) => prevFavorites.filter((i) => i.name !== item.name));
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);