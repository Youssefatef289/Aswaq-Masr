import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  supabaseService,
  isSupabaseConfigured,
  normalizeProduct,
  normalizeCategory,
  normalizeBrand,
  normalizeOffer,
  normalizeOrder
} from '../services/supabase';
import { useToast } from './ToastContext';

const AdminDataContext = createContext();

const DEFAULT_SETTINGS = {
  storeName: 'أسواق مصر',
  tagline: '',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  facebook: '',
  instagram: '',
  freeShippingMin: 0,
  defaultDeliveryFee: 0,
  whatsappGovernorates: ['بني سويف'],
  enableCod: true,
  enableCard: true,
  taxRate: 0
};

export const AdminDataProvider = ({ children }) => {
  const { addToast } = useToast();

  // All data comes from Supabase. States start EMPTY — no mock data, no localStorage fallback.
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [offers, setOffers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Derive real product counts (replaces hardcoded productCount from mock data)
  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    productCount: products.filter((p) => p.category_id === cat.id).length
  }));
  const brandsWithCounts = brands.map((br) => ({
    ...br,
    productCount: products.filter((p) => p.brand_id === br.id).length
  }));

  const refreshAll = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setIsLoaded(true);
      return;
    }
    setIsLoading(true);

    const [remoteProducts, remoteCategories, remoteBrands, remoteOffers, remoteOrders, remoteProfiles, remoteSettings] =
      await Promise.all([
        supabaseService.getProducts(),
        supabaseService.getCategories(),
        supabaseService.getBrands(),
        supabaseService.getOffers(),
        supabaseService.getOrders(),
        supabaseService.getProfiles(),
        supabaseService.getSettings()
      ]);

    const loadedCategories = Array.isArray(remoteCategories)
      ? remoteCategories.map(normalizeCategory).filter(Boolean)
      : [];
    const loadedBrands = Array.isArray(remoteBrands)
      ? remoteBrands.map(normalizeBrand).filter(Boolean)
      : [];

    if (Array.isArray(remoteProducts)) {
      setProducts(remoteProducts.map((product) => normalizeProduct(product, loadedCategories, loadedBrands)).filter(Boolean));
    }
    if (Array.isArray(remoteCategories)) {
      setCategories(loadedCategories);
    }
    if (Array.isArray(remoteBrands)) {
      setBrands(loadedBrands);
    }
    if (Array.isArray(remoteOffers)) {
      setOffers(remoteOffers.map(normalizeOffer).filter(Boolean));
    }
    if (Array.isArray(remoteOrders)) {
      setOrders(remoteOrders.map(normalizeOrder).filter(Boolean));
    }
    if (Array.isArray(remoteProfiles)) {
      setProfiles(remoteProfiles);
    }
    if (remoteSettings) {
      setSettings((prev) => ({ ...prev, ...remoteSettings }));
    }

    setIsLoading(false);
    setIsLoaded(true);
  }, []);

  // Initial sync on mount — Supabase is the single source of truth
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // ----------------------------------------------------------------------------
  // Products
  // ----------------------------------------------------------------------------
  const addProduct = async (productData) => {
    if (!isSupabaseConfigured) return null;
    const created = await supabaseService.addProduct(productData);
    if (!created) {
      addToast('تعذر إضافة المنتج (تحقق من صلاحيات المشرف واتصال Supabase)', 'error');
      return null;
    }
    const normalized = normalizeProduct(created);
    setProducts((prev) => [normalized, ...prev]);
    addToast(`تمت إضافة المنتج "${normalized.name}" بنجاح`, 'success');
    return normalized;
  };

  const updateProduct = async (id, updatedFields) => {
    const updated = await supabaseService.updateProduct(id, updatedFields);
    if (updated) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
      );
      addToast('تم تحديث بيانات المنتج بنجاح', 'success');
    } else {
      addToast('تعذر تحديث المنتج', 'error');
    }
  };

  const deleteProduct = async (id) => {
    const ok = await supabaseService.deleteProduct(id);
    if (ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast('تم حذف المنتج بنجاح', 'info');
    } else {
      addToast('تعذر حذف المنتج', 'error');
    }
  };

  // ----------------------------------------------------------------------------
  // Categories
  // ----------------------------------------------------------------------------
  const addCategory = async (categoryData) => {
    if (!isSupabaseConfigured) return null;
    const created = await supabaseService.addCategory(categoryData);
    if (!created) {
      addToast('تعذر إضافة القسم', 'error');
      return null;
    }
    const normalized = normalizeCategory(created);
    setCategories((prev) => [...prev, normalized]);
    addToast(`تمت إضافة القسم "${normalized.name}" بنجاح`, 'success');
    return normalized;
  };

  const updateCategory = async (id, updatedFields) => {
    const updated = await supabaseService.updateCategory(id, updatedFields);
    if (updated) {
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, ...updatedFields } : cat))
      );
      addToast('تم تحديث القسم بنجاح', 'success');
    } else {
      addToast('تعذر تحديث القسم', 'error');
    }
  };

  const deleteCategory = async (id) => {
    const ok = await supabaseService.deleteCategory(id);
    if (ok) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      addToast('تم حذف القسم بنجاح', 'info');
    } else {
      addToast('تعذر حذف القسم', 'error');
    }
  };

  // ----------------------------------------------------------------------------
  // Brands
  // ----------------------------------------------------------------------------
  const addBrand = async (brandData) => {
    if (!isSupabaseConfigured) return null;
    const created = await supabaseService.addBrand(brandData);
    if (!created) {
      addToast('تعذر إضافة الماركة', 'error');
      return null;
    }
    const normalized = normalizeBrand(created);
    setBrands((prev) => [...prev, normalized]);
    addToast(`تمت إضافة الماركة "${normalized.name}" بنجاح`, 'success');
    return normalized;
  };

  const updateBrand = async (id, updatedFields) => {
    const updated = await supabaseService.updateBrand(id, updatedFields);
    if (updated) {
      setBrands((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
      );
      addToast('تم تحديث بيانات البراند بنجاح', 'success');
    } else {
      addToast('تعذر تحديث البراند', 'error');
    }
  };

  const deleteBrand = async (id) => {
    const ok = await supabaseService.deleteBrand(id);
    if (ok) {
      setBrands((prev) => prev.filter((b) => b.id !== id));
      addToast('تم حذف البراند بنجاح', 'info');
    } else {
      addToast('تعذر حذف البراند', 'error');
    }
  };

  // ----------------------------------------------------------------------------
  // Offers
  // ----------------------------------------------------------------------------
  const addOffer = async (offerData) => {
    if (!isSupabaseConfigured) return null;
    const created = await supabaseService.addOffer(offerData);
    if (!created) {
      addToast('تعذر إضافة العرض', 'error');
      return null;
    }
    const normalized = normalizeOffer(created);
    setOffers((prev) => [...prev, normalized]);
    addToast(`تمت إضافة العرض "${normalized.title}" بنجاح`, 'success');
    return normalized;
  };

  const updateOffer = async (id, updatedFields) => {
    const updated = await supabaseService.updateOffer(id, updatedFields);
    if (updated) {
      setOffers((prev) =>
        prev.map((off) => (off.id === id ? { ...off, ...updatedFields } : off))
      );
      addToast('تم تحديث العرض بنجاح', 'success');
    } else {
      addToast('تعذر تحديث العرض', 'error');
    }
  };

  const deleteOffer = async (id) => {
    const ok = await supabaseService.deleteOffer(id);
    if (ok) {
      setOffers((prev) => prev.filter((off) => off.id !== id));
      addToast('تم حذف العرض بنجاح', 'info');
    } else {
      addToast('تعذر حذف العرض', 'error');
    }
  };

  // ----------------------------------------------------------------------------
  // Orders
  // ----------------------------------------------------------------------------
  const createOrder = async (orderData) => {
    const orderNumber = 'ASM-' + Math.floor(10000 + Math.random() * 90000);
    const newOrderPayload = {
      orderNumber,
      date: new Date().toISOString(),
      status: 'pending',
      statusLabel: 'قيد الانتظار',
      ...orderData
    };

    if (!isSupabaseConfigured) {
      // No backend configured — never fabricate a fake order locally.
      addToast('لم يتم إعداد Supabase — لا يمكن تأكيد الطلب', 'error');
      return null;
    }

    const created = await supabaseService.createOrder(newOrderPayload);
    if (!created) {
      addToast('تعذر إرسال الطلب، حاول مرة أخرى', 'error');
      return null;
    }

    const normalized = normalizeOrder(created);
    setOrders((prev) => [normalized, ...prev]);
    return normalized;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const statusLabels = {
      pending: 'قيد الانتظار',
      confirmed: 'تم التأكيد',
      preparing: 'جاري التجهيز',
      'out-for-delivery': 'في الطريق للتسليم',
      delivered: 'تم التوصيل',
      cancelled: 'تم الإلغاء'
    };

    const updated = await supabaseService.updateOrderStatus(orderId, newStatus);
    if (updated) {
      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === orderId
            ? { ...ord, status: newStatus, statusLabel: statusLabels[newStatus] || newStatus }
            : ord
        )
      );
      addToast(`تم تغيير حالة الطلب ${orderId} إلى: ${statusLabels[newStatus]}`, 'success');
    } else {
      addToast('تعذر تحديث حالة الطلب', 'error');
    }
  };

  // ----------------------------------------------------------------------------
  // Settings
  // ----------------------------------------------------------------------------
  const updateSettings = async (newSettings) => {
    const saved = await supabaseService.updateSettings(newSettings);
    if (saved) {
      setSettings((prev) => ({ ...prev, ...newSettings }));
      addToast('تم حفظ إعدادات المتجر بنجاح', 'success');
    } else {
      addToast('تعذر حفظ الإعدادات', 'error');
    }
  };

  // ----------------------------------------------------------------------------
  // Customers (Admin)
  // ----------------------------------------------------------------------------
  const updateUserRole = async (userId, role) => {
    const updated = await supabaseService.updateUserRole(userId, role);
    if (updated) {
      setProfiles((prev) => prev.map((p) => (p.id === userId ? { ...p, role } : p)));
      addToast('تم تحديث صلاحية المستخدم بنجاح', 'success');
    } else {
      addToast('تعذر تحديث صلاحية المستخدم', 'error');
    }
  };

  const deleteUser = async (userId) => {
    const ok = await supabaseService.deleteUser(userId);
    if (ok) {
      setProfiles((prev) => prev.filter((profile) => profile.id !== userId));
      setOrders((prev) => prev.filter((order) => order.userId !== userId));
      addToast('تم حذف حساب العميل بنجاح', 'info');
    } else {
      addToast('تعذر حذف حساب العميل', 'error');
    }
    return ok;
  };

  return (
    <AdminDataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories: categoriesWithCounts,
        addCategory,
        updateCategory,
        deleteCategory,
        brands: brandsWithCounts,
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
        profiles,
        updateUserRole,
        deleteUser,
        settings,
        updateSettings,
        isConfigured: isSupabaseConfigured,
        isLoaded,
        isLoading,
        refreshAll
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