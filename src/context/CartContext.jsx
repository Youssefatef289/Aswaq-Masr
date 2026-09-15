import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [shippingGovernorate, setShippingGovernorate] = useState('cairo');
  const [shippingCost, setShippingCost] = useState(30);

  useEffect(() => {
    localStorage.setItem('aswaaq_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('aswaaq_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('aswaaq_coupon');
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          brandName: product.brandName,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.images?.[0] || product.image,
          quantity: quantity,
          sku: product.sku || ''
        }
      ];
    });

    addToast(`تمت إضافة "${product.name}" إلى السلة بنجاح`, 'success');
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((i) => i.id === id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (itemToRemove) {
      addToast(`تم حذف "${itemToRemove.name}" من السلة`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    localStorage.removeItem('aswaaq_cart');
    localStorage.removeItem('aswaaq_coupon');
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ASWAAQ10') {
      const newCoupon = { code: 'ASWAAQ10', discountPercent: 10, type: 'percent', label: 'خصم 10%' };
      setCoupon(newCoupon);
      addToast('تم تطبيق كود الخصم (10% خصم) بنجاح!', 'success');
      return { success: true, coupon: newCoupon };
    } else if (cleanCode === 'MASR50') {
      const newCoupon = { code: 'MASR50', discountAmount: 50, type: 'fixed', label: 'خصم 50 ج.م' };
      setCoupon(newCoupon);
      addToast('تم تطبيق كود الخصم (50 ج.م) بنجاح!', 'success');
      return { success: true, coupon: newCoupon };
    } else {
      addToast('كود الخصم غير صالح أو منتهي الصلاحية', 'error');
      return { success: false, message: 'كود غير صالح' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast('تمت إزالة كود الخصم', 'info');
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let discount = 0;
  if (coupon) {
    if (coupon.type === 'percent') {
      discount = Math.round((subtotal * coupon.discountPercent) / 100);
    } else if (coupon.type === 'fixed') {
      discount = Math.min(coupon.discountAmount, subtotal);
    }
  }

  // Free shipping on orders over 1000 EGP
  const calculatedShipping = subtotal > 1000 || cartItems.length === 0 ? 0 : shippingCost;
  const grandTotal = Math.max(0, subtotal - discount + calculatedShipping);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        discount,
        coupon,
        applyCoupon,
        removeCoupon,
        shippingGovernorate,
        setShippingGovernorate,
        shippingCost: calculatedShipping,
        baseShippingCost: shippingCost,
        setShippingCost,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

