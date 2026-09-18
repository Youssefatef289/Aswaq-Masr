import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseService, isSupabaseConfigured } from '../services/supabase';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

const GUEST_KEY = 'aswaaq_wishlist';

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // wishlistItems holds normalized product snapshots for the UI
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem(GUEST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from DB when a user is authenticated (or fall back to guest storage)
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    if (isAuthenticated && user?.id) {
      supabaseService.getWishlist(user.id).then((rows) => {
        if (rows) {
          // Store product ids; product details are hydrated from the catalog on the Wishlist page
          setWishlistItems(rows.map((row) => ({ id: row.productId, addedAt: row.addedAt })));
        }
      });
      localStorage.removeItem(GUEST_KEY);
    } else {
      try {
        const saved = localStorage.getItem(GUEST_KEY);
        setWishlistItems(saved ? JSON.parse(saved) : []);
      } catch {
        setWishlistItems([]);
      }
    }
  }, [isAuthenticated, user?.id]);

  // Guest persistence only (logged-in wishlists live in Supabase)
  useEffect(() => {
    if (!isSupabaseConfigured || !isAuthenticated) {
      localStorage.setItem(GUEST_KEY, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isAuthenticated, isSupabaseConfigured]);

  const toggleWishlist = async (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);

    if (isAuthenticated && user?.id) {
      const result = exists
        ? await supabaseService.removeWishlistItem(user.id, product.id)
        : await supabaseService.addWishlistItem(user.id, product.id);

      if (!result?.success) {
        addToast(result?.error || 'تعذر تحديث المفضلة', 'error');
        return;
      }

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
      return;
    }

    // Guest flow (device-local, no DB session yet)
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

  const removeFromWishlist = async (productId) => {
    if (isAuthenticated && user?.id && isSupabaseConfigured) {
      await supabaseService.removeWishlistItem(user.id, productId);
    }
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    addToast('تمت إزالة المنتج من المفضلة', 'info');
  };

  const clearWishlist = async () => {
    if (isAuthenticated && user?.id && isSupabaseConfigured) {
      // Clear each item server-side
      for (const item of wishlistItems) {
        await supabaseService.removeWishlistItem(user.id, item.id);
      }
    }
    setWishlistItems([]);
    localStorage.removeItem(GUEST_KEY);
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

