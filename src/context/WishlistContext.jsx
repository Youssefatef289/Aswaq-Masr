import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('aswaaq_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);
    if (exists) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`تمت إزالة "${product.name}" من المفضلة`, 'info');
    } else {
      setWishlistItems((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brandName: product.brandName,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.images?.[0] || product.image,
          rating: product.rating,
          stock: product.stock
        }
      ]);
      addToast(`تمت إضافة "${product.name}" إلى المفضلة ❤️`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    addToast('تمت إزالة المنتج من المفضلة', 'info');
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('aswaaq_wishlist');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

