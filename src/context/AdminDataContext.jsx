import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';
import { initialCategories } from '../data/categories';
import { initialBrands } from '../data/brands';
import { initialOffers } from '../data/offers';
import { initialOrders } from '../data/orders';
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
        tagline: 'وجهتك الأولى للتسوق الإلكتروني في مصر',
        phone: '19888',
        whatsapp: '+201012345678',
        email: 'info@aswaaqmasr.com',
        address: 'شارع التسعين الجنوبي، التجمع الخامس، القاهرة الجديدة',
        facebook: 'https://facebook.com/aswaaqmasr',
        instagram: 'https://instagram.com/aswaaqmasr',
        freeShippingMin: 1000,
        defaultDeliveryFee: 30,
        enableCod: true,
        enableCard: true,
        taxRate: 14
      };
    } catch {
      return {
        storeName: 'أسواق مصر',
        tagline: 'وجهتك الأولى للتسوق الإلكتروني في مصر',
        phone: '19888',
        whatsapp: '+201012345678',
        email: 'info@aswaaqmasr.com',
        address: 'شارع التسعين الجنوبي، التجمع الخامس، القاهرة الجديدة',
        facebook: 'https://facebook.com/aswaaqmasr',
        instagram: 'https://instagram.com/aswaaqmasr',
        freeShippingMin: 1000,
        defaultDeliveryFee: 30,
        enableCod: true,
        enableCard: true,
        taxRate: 14
      };
    }
  });

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
  const addProduct = (productData) => {
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
    addToast(`تمت إضافة المنتج "${newProduct.name}" بنجاح`, 'success');
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    addToast('تم تحديث بيانات المنتج بنجاح', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    addToast('تم حذف المنتج بنجاح', 'info');
  };

  // Category Operations
  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: categoryData.id || 'cat-' + Date.now(),
      productCount: 0
    };
    setCategories((prev) => [...prev, newCategory]);
    addToast(`تمت إضافة القسم "${newCategory.name}" بنجاح`, 'success');
  };

  const updateCategory = (id, updatedFields) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat))
    );
    addToast('تم تحديث القسم بنجاح', 'success');
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    addToast('تم حذف القسم بنجاح', 'info');
  };

  // Brand Operations
  const addBrand = (brandData) => {
    const newBrand = {
      ...brandData,
      id: brandData.id || 'brand-' + Date.now(),
      productCount: 0
    };
    setBrands((prev) => [...prev, newBrand]);
    addToast(`تمت إضافة الماركة "${newBrand.name}" بنجاح`, 'success');
  };

  const updateBrand = (id, updatedFields) => {
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    addToast('تم تحديث بيانات البراند بنجاح', 'success');
  };

  const deleteBrand = (id) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
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
    addToast(`تم تغيير حالة الطلب ${orderId} إلى: ${statusLabels[newStatus]}`, 'success');
  };

  // Settings update
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
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

