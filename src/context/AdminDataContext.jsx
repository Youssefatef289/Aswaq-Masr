import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import { initialCategories } from '../data/categories';
import { initialBrands } from '../data/brands';
import { initialOffers } from '../data/offers';
import { initialOrders } from '../data/orders';
import { supabaseService, isSupabaseConfigured } from '../services/supabase';
import { useToast } from './ToastContext';

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
  const { addToast } = useToast();

  // Products state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Categories state
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_categories');
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  // Brands state
  const [brands, setBrands] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_brands');
      return saved ? JSON.parse(saved) : initialBrands;
    } catch {
      return initialBrands;
    }
  });

  // Offers state
  const [offers, setOffers] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_offers');
      return saved ? JSON.parse(saved) : initialOffers;
    } catch {
      return initialOffers;
    }
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Store Settings state
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('aswaaq_settings');
      return saved ? JSON.parse(saved) : {
        storeName: 'أسواق مصر',
        tagline: 'كل احتياجات بيتك في بني سويف بأفضل سعر وأسرع توصيل',
        phone: '19888',
        whatsapp: '+201012345678',
        email: 'info@aswaqmasr.com',
        address: 'بني سويف - شارع عبد السلام عارف - بجوار البنك الأهلي',
        facebook: 'https://facebook.com/aswaqmasr',
        instagram: 'https://instagram.com/aswaqmasr',
        freeShippingMin: 500,
        defaultDeliveryFee: 20,
        enableCod: true,
        enableCard: true,
        taxRate: 14
      };
    } catch {
      return {
        storeName: 'أسواق مصر',
        tagline: 'كل احتياجات بيتك في بني سويف بأفضل سعر وأسرع توصيل',
        phone: '19888',
        whatsapp: '+201012345678',
        email: 'info@aswaqmasr.com',
        address: 'بني سويف - شارع عبد السلام عارف - بجوار البنك الأهلي',
        facebook: 'https://facebook.com/aswaqmasr',
        instagram: 'https://instagram.com/aswaqmasr',
        freeShippingMin: 500,
        defaultDeliveryFee: 20,
        enableCod: true,
        enableCard: true,
        taxRate: 14
      };
    }
  });

  // Supabase Initial Sync on mount if configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      // Sync products
      supabaseService.getProducts().then((remoteProducts) => {
        if (remoteProducts && remoteProducts.length > 0) setProducts(remoteProducts);
      });
      // Sync categories
      supabaseService.getCategories().then((remoteCategories) => {
        if (remoteCategories && remoteCategories.length > 0) setCategories(remoteCategories);
      });
      // Sync brands
      supabaseService.getBrands().then((remoteBrands) => {
        if (remoteBrands && remoteBrands.length > 0) setBrands(remoteBrands);
      });
      // Sync orders
      supabaseService.getOrders().then((remoteOrders) => {
        if (remoteOrders && remoteOrders.length > 0) setOrders(remoteOrders);
      });
      // Sync settings
      supabaseService.getSettings().then((remoteSettings) => {
        if (remoteSettings) setSettings(prev => ({ ...prev, ...remoteSettings }));
      });
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aswaaq_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aswaaq_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('aswaaq_brands', JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    localStorage.setItem('aswaaq_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('aswaaq_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aswaaq_settings', JSON.stringify(settings));
  }, [settings]);

  // Product Operations
  const addProduct = async (productData) => {
    const newProduct = {
      ...productData,
      id: 'prod-' + Date.now(),
      rating: productData.rating || 5.0,
      reviewsCount: 0,
      isFeatured: !!productData.isFeatured,
      isBestSeller: !!productData.isBestSeller,
      isNew: true,
      images: productData.images?.length > 0 ? productData.images : [productData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80']
    };

    setProducts((prev) => [newProduct, ...prev]);
    supabaseService.addProduct(newProduct);
    addToast(`تمت إضافة المنتج "${newProduct.name}" بنجاح`, 'success');
    return newProduct;
  };

  const updateProduct = async (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    supabaseService.updateProduct(id, updatedFields);
    addToast('تم تحديث بيانات المنتج بنجاح', 'success');
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    supabaseService.deleteProduct(id);
    addToast('تم حذف المنتج بنجاح', 'info');
  };

  // Category Operations
  const addCategory = async (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: categoryData.id || 'cat-' + Date.now(),
      productCount: 0
    };
    setCategories((prev) => [...prev, newCategory]);
    supabaseService.addCategory(newCategory);
    addToast(`تمت إضافة القسم "${newCategory.name}" بنجاح`, 'success');
  };

  const updateCategory = async (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat))
    );
    supabaseService.updateCategory(id, updatedFields);
    addToast('تم تحديث القسم بنجاح', 'success');
  };

  const deleteCategory = async (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    supabaseService.deleteCategory(id);
    addToast('تم حذف القسم بنجاح', 'info');
  };

  // Brand Operations
  const addBrand = async (brandData) => {
    const newBrand = {
      ...brandData,
      id: brandData.id || 'brand-' + Date.now(),
      productCount: 0
    };
    setBrands((prev) => [...prev, newBrand]);
    supabaseService.addBrand(newBrand);
    addToast(`تمت إضافة الماركة "${newBrand.name}" بنجاح`, 'success');
  };

  const updateBrand = async (id, updatedFields) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    supabaseService.updateBrand(id, updatedFields);
    addToast('تم تحديث بيانات البراند بنجاح', 'success');
  };

  const deleteBrand = async (id) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    supabaseService.deleteBrand(id);
    addToast('تم حذف البراند بنجاح', 'info');
  };

  // Offer Operations
  const addOffer = (offerData) => {
    const newOffer = {
      ...offerData,
      id: 'offer-' + Date.now()
    };
    setOffers((prev) => [...prev, newOffer]);
    addToast(`تمت إضافة العرض "${newOffer.title}" بنجاح`, 'success');
  };

  const updateOffer = (id, updatedFields) => {
    setOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, ...updatedFields } : off))
    );
    addToast('تم تحديث العرض بنجاح', 'success');
  };

  const deleteOffer = (id) => {
    setOffers((prev) => prev.filter((off) => off.id !== id));
    addToast('تم حذف العرض بنجاح', 'info');
  };

  // Order Operations
  const createOrder = (orderData) => {
    const orderNumber = 'ASM-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderNumber,
      date: new Date().toISOString(),
      status: 'pending',
      statusLabel: 'قيد الانتظار',
      ...orderData
    };
    setOrders((prev) => [newOrder, ...prev]);
    supabaseService.createOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const statusLabels = {
      pending: 'قيد الانتظار',
      confirmed: 'تم التأكيد',
      preparing: 'جاري التجهيز',
      'out-for-delivery': 'في الطريق للتسليم',
      delivered: 'تم التوصيل',
      cancelled: 'تم الإلغاء'
    };

    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, status: newStatus, statusLabel: statusLabels[newStatus] || newStatus }
          : ord
      )
    );
    supabaseService.updateOrderStatus(orderId, newStatus);
    addToast(`تم تغيير حالة الطلب ${orderId} إلى: ${statusLabels[newStatus]}`, 'success');
  };

  // Settings update
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    supabaseService.updateSettings(newSettings);
    addToast('تم حفظ إعدادات المتجر بنجاح', 'success');
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        brands,
        addBrand,
        updateBrand,
        deleteBrand,
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        orders,
        createOrder,
        updateOrderStatus,
        settings,
        updateSettings
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
