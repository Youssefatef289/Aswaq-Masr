import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder') &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

// ==============================================================================
// Normalizers to bridge DB schema (snake_case) with React UI props (camelCase)
// ==============================================================================

export const normalizeProduct = (item, categories = [], brands = []) => {
  if (!item) return null;
  const category = categories.find(c => c.id === item.category_id || c.slug === item.category_id);
  const brand = brands.find(b => b.id === item.brand_id || b.slug === item.brand_id);

  const images = Array.isArray(item.product_images) && item.product_images.length > 0
    ? [...item.product_images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(img => img.image_url)
    : (Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.main_image_url || item.image_url || item.image]);

  return {
    id: item.id,
    name: item.name_ar || item.title || item.name || '',
    name_ar: item.name_ar || item.name || '',
    name_en: item.name_en || '',
    subcategory: item.subcategory || item.sub_category || '',
    slug: item.slug || item.id,
    sku: item.sku || '',
    
    categoryId: item.category_id || item.category || category?.id,
    category_id: item.category_id || item.category,
    categoryName: category?.name || category?.name_ar || item.category_name || 'قسم عام',
    
    brandId: item.brand_id || item.brand || brand?.id,
    brand_id: item.brand_id || item.brand,
    brandName: brand?.name || brand?.name_ar || item.brand_name || 'ماركة أصلية',

    price: Number(item.price) || 0,
    oldPrice: item.compare_at_price ? Number(item.compare_at_price) : (item.old_price ? Number(item.old_price) : null),
    compare_at_price: item.compare_at_price ? Number(item.compare_at_price) : null,
    costPrice: item.cost_price ? Number(item.cost_price) : 0,
    cost_price: item.cost_price ? Number(item.cost_price) : 0,
    discount: item.discount_percentage ? Number(item.discount_percentage) : (item.discount ? Number(item.discount) : 0),
    discount_percentage: item.discount_percentage ? Number(item.discount_percentage) : 0,

    stock: item.stock_quantity !== undefined ? Number(item.stock_quantity) : (item.stock !== undefined ? Number(item.stock) : 50),
    stock_quantity: item.stock_quantity !== undefined ? Number(item.stock_quantity) : 50,
    lowStockThreshold: item.low_stock_threshold || 5,

    image: item.main_image_url || item.image_url || images[0],
    main_image_url: item.main_image_url || item.image_url || images[0],
    images: images.filter(Boolean),

    description: item.description_ar || item.description || '',
    description_ar: item.description_ar || item.description || '',
    description_en: item.description_en || '',

    isActive: item.is_active !== undefined ? Boolean(item.is_active) : true,
    is_active: item.is_active !== undefined ? Boolean(item.is_active) : true,
    isFeatured: Boolean(item.is_featured),
    is_featured: Boolean(item.is_featured),
    isBestSeller: Boolean(item.is_best_seller || item.is_bestseller),
    is_best_seller: Boolean(item.is_best_seller || item.is_bestseller),
    isNew: Boolean(item.is_new),
    is_new: Boolean(item.is_new),

    rating: Number(item.rating) || 5.0,
    reviewsCount: Number(item.reviews_count) || 0,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
};

export const normalizeCategory = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    name: item.name_ar || item.name || '',
    name_ar: item.name_ar || item.name || '',
    name_en: item.name_en || '',
    slug: item.slug || item.id,
    description: item.description || '',
    image: item.image_url || item.image || '',
    image_url: item.image_url || item.image || '',
    isActive: item.is_active !== undefined ? Boolean(item.is_active) : true,
    sortOrder: item.sort_order || 0
  };
};

export const normalizeBrand = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    name: item.name_ar || item.name || '',
    name_ar: item.name_ar || item.name || '',
    name_en: item.name_en || '',
    slug: item.slug || item.id,
    description: item.description || '',
    logo: item.logo_url || item.logo || '',
    logo_url: item.logo_url || item.logo || '',
    isActive: item.is_active !== undefined ? Boolean(item.is_active) : true
  };
};

export const normalizeOffer = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    title: item.title || '',
    subtitle: item.subtitle || '',
    tag: item.tag || '',
    bannerImage: item.banner_image_url || item.bannerImage || '',
    banner_image_url: item.banner_image_url || item.bannerImage || '',
    link: item.link || '/products',
    buttonText: item.button_text || item.buttonText || 'تسوق العرض الآن',
    bgGradient: item.bg_gradient || item.bgGradient || 'from-red-600 to-rose-800',
    badge: item.badge || '',
    startsAt: item.starts_at,
    expiresAt: item.expires_at,
    isActive: item.is_active !== undefined ? Boolean(item.is_active) : true,
    sortOrder: item.sort_order || 0
  };
};

export const normalizeProfile = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    name: item.full_name || item.name || '',
    fullName: item.full_name || item.name || '',
    email: item.email || '',
    phone: item.phone || '',
    avatar: item.avatar_url || item.avatar || '',
    avatarUrl: item.avatar_url || item.avatar || '',
    governorate: item.governorate || '',
    city: item.city || '',
    address: item.address || '',
    role: item.role || 'customer',
    isAdmin: item.role === 'admin',
    isManager: item.role === 'manager',
    createdAt: item.created_at,
    updatedAt: item.updated_at
  };
};

export const normalizeOrder = (item) => {
  if (!item) return null;
  return {
    id: item.id,
    orderNumber: item.order_number || item.id,
    userId: item.user_id,
    customerName: item.customer_name,
    phone: item.phone,
    alternatePhone: item.alternate_phone,
    governorate: item.governorate || 'بني سويف',
    city: item.city || '',
    address: item.address,
    notes: item.notes || '',
    paymentMethod: item.payment_method,
    paymentStatus: item.payment_status || 'pending',
    status: item.order_status || item.status || 'pending',
    subtotal: Number(item.subtotal) || 0,
    discount: Number(item.discount) || 0,
    shippingCost: Number(item.shipping_cost) || 0,
    total: Number(item.total || item.total_amount) || 0,
    items: Array.isArray(item.order_items) && item.order_items.length > 0
      ? item.order_items.map(oi => ({
          id: oi.product_id || oi.id,
          name: oi.product_name,
          image: oi.product_image,
          price: Number(oi.price),
          quantity: Number(oi.quantity),
          totalPrice: Number(oi.total_price)
        }))
      : (Array.isArray(item.items) ? item.items : []),
    date: item.created_at,
    createdAt: item.created_at
  };
};

// ==============================================================================
// Supabase Service Layer (CRUD, Storage, Auth & Realtime)
// ==============================================================================
export const supabaseService = {
  // ----------------------------------------------------------------------------
  // Products
  // ----------------------------------------------------------------------------
  async getProducts() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            sort_order,
            is_primary
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getProducts error:', err.message);
      return null;
    }
  },

  async addProduct(product) {
    if (!supabase) return null;
    try {
      const dbProduct = {
        name_ar: product.name_ar || product.name,
        name_en: product.name_en || null,
        subcategory: product.subcategory || product.sub_category || '',
        slug: product.slug || (product.name ? product.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString(36) : 'prod-' + Date.now()),
        sku: product.sku || 'SKU-' + Date.now().toString(36).toUpperCase(),
        description_ar: product.description_ar || product.description || '',
        description_en: product.description_en || null,
        category_id: product.category_id || product.categoryId || null,
        brand_id: product.brand_id || product.brandId || null,
        price: Number(product.price) || 0,
        compare_at_price: product.compare_at_price || product.oldPrice ? Number(product.compare_at_price || product.oldPrice) : null,
        cost_price: Number(product.cost_price || product.costPrice) || 0,
        discount_percentage: Number(product.discount_percentage || product.discount) || 0,
        stock_quantity: Number(product.stock_quantity || product.stock) || 0,
        low_stock_threshold: Number(product.low_stock_threshold || product.lowStockThreshold) || 5,
        main_image_url: product.main_image_url || product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
        is_active: product.is_active !== undefined ? product.is_active : true,
        is_featured: !!product.is_featured || !!product.isFeatured,
        is_best_seller: !!product.is_best_seller || !!product.isBestSeller,
        is_new: product.is_new !== undefined ? product.is_new : true
      };

      const { data, error } = await supabase
        .from('products')
        .insert([dbProduct])
        .select()
        .single();

      if (error) throw error;

      // Handle extra images gallery
      if (Array.isArray(product.images) && product.images.length > 0) {
        const imageRows = product.images.map((url, idx) => ({
          product_id: data.id,
          image_url: url,
          sort_order: idx,
          is_primary: idx === 0
        }));
        await supabase.from('product_images').insert(imageRows);
      }

      return data;
    } catch (err) {
      console.error('Supabase addProduct error:', err.message);
      return null;
    }
  },

  async updateProduct(id, updates) {
    if (!supabase) return null;
    try {
      const dbUpdates = {};
      if (updates.name || updates.name_ar) dbUpdates.name_ar = updates.name_ar || updates.name;
      if (updates.name_en !== undefined) dbUpdates.name_en = updates.name_en;
      if (updates.subcategory !== undefined || updates.sub_category !== undefined) {
        dbUpdates.subcategory = updates.subcategory !== undefined ? updates.subcategory : updates.sub_category;
      }
      if (updates.slug) dbUpdates.slug = updates.slug;
      if (updates.sku) dbUpdates.sku = updates.sku;
      if (updates.description || updates.description_ar) dbUpdates.description_ar = updates.description_ar || updates.description;
      if (updates.category_id || updates.categoryId) dbUpdates.category_id = updates.category_id || updates.categoryId;
      if (updates.brand_id || updates.brandId) dbUpdates.brand_id = updates.brand_id || updates.brandId;
      if (updates.price !== undefined) dbUpdates.price = Number(updates.price);
      if (updates.compare_at_price !== undefined || updates.oldPrice !== undefined) {
        dbUpdates.compare_at_price = updates.compare_at_price ? Number(updates.compare_at_price) : (updates.oldPrice ? Number(updates.oldPrice) : null);
      }
      if (updates.cost_price !== undefined || updates.costPrice !== undefined) {
        dbUpdates.cost_price = Number(updates.cost_price || updates.costPrice);
      }
      if (updates.discount_percentage !== undefined || updates.discount !== undefined) {
        dbUpdates.discount_percentage = Number(updates.discount_percentage || updates.discount);
      }
      if (updates.stock_quantity !== undefined || updates.stock !== undefined) {
        dbUpdates.stock_quantity = Number(updates.stock_quantity || updates.stock);
      }
      if (updates.main_image_url || updates.image) {
        dbUpdates.main_image_url = updates.main_image_url || updates.image;
      }
      if (updates.is_active !== undefined || updates.isActive !== undefined) {
        dbUpdates.is_active = updates.is_active !== undefined ? updates.is_active : updates.isActive;
      }
      if (updates.is_featured !== undefined || updates.isFeatured !== undefined) {
        dbUpdates.is_featured = updates.is_featured !== undefined ? updates.is_featured : updates.isFeatured;
      }
      if (updates.is_best_seller !== undefined || updates.isBestSeller !== undefined) {
        dbUpdates.is_best_seller = updates.is_best_seller !== undefined ? updates.is_best_seller : updates.isBestSeller;
      }

      const { data, error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update product images if provided
      if (Array.isArray(updates.images)) {
        await supabase.from('product_images').delete().eq('product_id', id);
        const imageRows = updates.images.map((url, idx) => ({
          product_id: id,
          image_url: url,
          sort_order: idx,
          is_primary: idx === 0
        }));
        await supabase.from('product_images').insert(imageRows);
      }

      return data;
    } catch (err) {
      console.error('Supabase updateProduct error:', err.message);
      return null;
    }
  },

  async deleteProduct(id) {
    if (!supabase) return true;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deleteProduct error:', err.message);
      return false;
    }
  },

  // ----------------------------------------------------------------------------
  // Categories
  // ----------------------------------------------------------------------------
  async getCategories() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getCategories error:', err.message);
      return null;
    }
  },

  async addCategory(cat) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{
          name_ar: cat.name_ar || cat.name,
          name_en: cat.name_en || null,
          slug: cat.slug || (cat.name ? cat.name.toLowerCase().replace(/\s+/g, '-') : 'cat-' + Date.now()),
          description: cat.description || '',
          image_url: cat.image_url || cat.image || '',
          sort_order: cat.sort_order || cat.sortOrder || 0,
          is_active: cat.is_active !== undefined ? cat.is_active : true
        }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase addCategory error:', err.message);
      return null;
    }
  },

  async updateCategory(id, updates) {
    if (!supabase) return null;
    try {
      const dbUpdates = {};
      if (updates.name || updates.name_ar) dbUpdates.name_ar = updates.name_ar || updates.name;
      if (updates.name_en !== undefined) dbUpdates.name_en = updates.name_en;
      if (updates.slug) dbUpdates.slug = updates.slug;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.image || updates.image_url) dbUpdates.image_url = updates.image_url || updates.image;
      if (updates.is_active !== undefined) dbUpdates.is_active = updates.is_active;
      if (updates.sort_order !== undefined) dbUpdates.sort_order = updates.sort_order;

      const { data, error } = await supabase
        .from('categories')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateCategory error:', err.message);
      return null;
    }
  },

  async deleteCategory(id) {
    if (!supabase) return true;
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deleteCategory error:', err.message);
      return false;
    }
  },

  // ----------------------------------------------------------------------------
  // Brands
  // ----------------------------------------------------------------------------
  async getBrands() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name_ar', { ascending: true });
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getBrands error:', err.message);
      return null;
    }
  },

  async addBrand(brand) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('brands')
        .insert([{
          name_ar: brand.name_ar || brand.name,
          name_en: brand.name_en || null,
          slug: brand.slug || (brand.name ? brand.name.toLowerCase().replace(/\s+/g, '-') : 'brand-' + Date.now()),
          description: brand.description || '',
          logo_url: brand.logo_url || brand.logo || '',
          is_active: brand.is_active !== undefined ? brand.is_active : true
        }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase addBrand error:', err.message);
      return null;
    }
  },

  async updateBrand(id, updates) {
    if (!supabase) return null;
    try {
      const dbUpdates = {};
      if (updates.name || updates.name_ar) dbUpdates.name_ar = updates.name_ar || updates.name;
      if (updates.name_en !== undefined) dbUpdates.name_en = updates.name_en;
      if (updates.slug) dbUpdates.slug = updates.slug;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.logo || updates.logo_url) dbUpdates.logo_url = updates.logo_url || updates.logo;
      if (updates.is_active !== undefined) dbUpdates.is_active = updates.is_active;

      const { data, error } = await supabase
        .from('brands')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateBrand error:', err.message);
      return null;
    }
  },

  async deleteBrand(id) {
    if (!supabase) return true;
    try {
      const { error } = await supabase.from('brands').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deleteBrand error:', err.message);
      return false;
    }
  },

  // ----------------------------------------------------------------------------
  // Offers (Promotions & Banners)
  // ----------------------------------------------------------------------------
  async getOffers() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getOffers error:', err.message);
      return null;
    }
  },

  async addOffer(offer) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('offers')
        .insert([{
          title: offer.title,
          subtitle: offer.subtitle || '',
          tag: offer.tag || '',
          banner_image_url: offer.banner_image_url || offer.bannerImage || '',
          link: offer.link || '/products',
          button_text: offer.buttonText || offer.button_text || 'تسوق العرض الآن',
          bg_gradient: offer.bgGradient || offer.bg_gradient || 'from-red-600 to-rose-800',
          badge: offer.badge || '',
          is_active: offer.is_active !== undefined ? offer.is_active : true,
          sort_order: Number(offer.sortOrder || offer.sort_order) || 0
        }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase addOffer error:', err.message);
      return null;
    }
  },

  async updateOffer(id, updates) {
    if (!supabase) return null;
    try {
      const dbUpdates = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.subtitle !== undefined) dbUpdates.subtitle = updates.subtitle;
      if (updates.tag !== undefined) dbUpdates.tag = updates.tag;
      if (updates.bannerImage || updates.banner_image_url) {
        dbUpdates.banner_image_url = updates.banner_image_url || updates.bannerImage;
      }
      if (updates.link !== undefined) dbUpdates.link = updates.link;
      if (updates.buttonText !== undefined) dbUpdates.button_text = updates.buttonText;
      if (updates.bgGradient !== undefined) dbUpdates.bg_gradient = updates.bgGradient;
      if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
      if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;
      if (updates.is_active !== undefined) dbUpdates.is_active = updates.is_active;
      if (updates.sortOrder !== undefined) dbUpdates.sort_order = Number(updates.sortOrder);

      const { data, error } = await supabase
        .from('offers')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateOffer error:', err.message);
      return null;
    }
  },

  async deleteOffer(id) {
    if (!supabase) return true;
    try {
      const { error } = await supabase.from('offers').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deleteOffer error:', err.message);
      return false;
    }
  },

  // ----------------------------------------------------------------------------
  // Coupons (validated server-side via coupons table)
  // ----------------------------------------------------------------------------
  async getCouponByCode(code) {
    if (!supabase || !code) return null;
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.trim().toUpperCase())
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        id: data.id,
        code: data.code,
        discountType: data.discount_type,
        discountValue: Number(data.discount_value),
        minOrderAmount: Number(data.min_order_amount) || 0,
        usageLimit: data.usage_limit,
        usedCount: Number(data.used_count) || 0,
        isActive: Boolean(data.is_active),
        startsAt: data.starts_at,
        expiresAt: data.expires_at
      };
    } catch (err) {
      console.warn('Supabase getCouponByCode error:', err.message);
      return null;
    }
  },

  // ----------------------------------------------------------------------------
  // Orders & Order Items
  // ----------------------------------------------------------------------------
  async getOrders() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_id,
            product_name,
            product_image,
            price,
            quantity,
            total_price
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getOrders error:', err.message);
      return null;
    }
  },

  async createOrder(order) {
    if (!supabase) return null;
    try {
      const orderNumber = 'ASW-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
      
      const dbOrder = {
        order_number: orderNumber,
        user_id: order.userId || order.user_id || null,
        customer_name: order.customerName || order.customer_name,
        phone: order.phone,
        alternate_phone: order.alternatePhone || order.alternate_phone || null,
        governorate: order.governorate || 'بني سويف',
        city: order.city || 'مدينة بني سويف',
        address: order.address,
        notes: order.notes || null,
        payment_method: order.paymentMethod || order.payment_method || 'الدفع عند الاستلام',
        payment_status: 'pending',
        order_status: 'pending',
        subtotal: Number(order.subtotal) || 0,
        discount: Number(order.discount) || 0,
        shipping_cost: Number(order.shippingCost || order.shipping_cost) || 0,
        total: Number(order.total) || 0
      };

      const { data: insertedOrder, error: orderErr } = await supabase
        .from('orders')
        .insert([dbOrder])
        .select()
        .single();

      if (orderErr) throw orderErr;

      // Insert Order Items
      if (Array.isArray(order.items) && order.items.length > 0) {
        const orderItems = order.items.map(item => ({
          order_id: insertedOrder.id,
          product_id: item.id?.length > 20 ? item.id : null,
          product_name: item.name || 'منتج',
          product_image: item.image || item.main_image_url || '',
          price: Number(item.price),
          quantity: Number(item.quantity) || 1,
          total_price: Number(item.price) * (Number(item.quantity) || 1)
        }));

        await supabase.from('order_items').insert(orderItems);
      }

      return insertedOrder;
    } catch (err) {
      console.error('Supabase createOrder error:', err.message);
      return null;
    }
  },

  async updateOrderStatus(orderId, status) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ order_status: status })
        .eq('id', orderId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateOrderStatus error:', err.message);
      return null;
    }
  },

  // ----------------------------------------------------------------------------
  // Profiles (Customers & Admins)
  // ----------------------------------------------------------------------------
  async getProfiles() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getProfiles error:', err.message);
      return null;
    }
  },

  async getProfile(userId) {
    if (!supabase || !userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('Supabase getProfile error:', err.message);
      return null;
    }
  },

  async updateProfile(userId, updates) {
    if (!supabase || !userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.name || updates.full_name,
          phone: updates.phone,
          governorate: updates.governorate,
          city: updates.city,
          address: updates.address,
          avatar_url: updates.avatar_url || updates.avatar
        })
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateProfile error:', err.message);
      return null;
    }
  },

  async updateUserRole(userId, role) {
    if (!supabase || !userId) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateUserRole error:', err.message);
      return null;
    }
  },

  async deleteUser(userId) {
    if (!supabase || !userId) return false;
    try {
      const { error } = await supabase.rpc('delete_user_account', { target_user_id: userId });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deleteUser error:', err.message);
      return false;
    }
  },

  // ----------------------------------------------------------------------------
  // Auth (Supabase Auth — roles come from public.profiles, NEVER from metadata)
  // ----------------------------------------------------------------------------
  async getSession() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session || null;
    } catch (err) {
      console.warn('Supabase getSession error:', err.message);
      return null;
    }
  },

  async signIn(email, password) {
    if (!supabase) return { success: false, error: 'Supabase غير مهيأ' };
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: (email || '').trim().toLowerCase(),
        password
      });
      if (error) throw error;
      return { success: true, session: data.session };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async signUp({ email, password, fullName, phone }) {
    if (!supabase) return { success: false, error: 'Supabase غير مهيأ' };
    try {
      const { data, error } = await supabase.auth.signUp({
        email: (email || '').trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || ''
          }
        }
      });
      if (error) throw error;
      return { success: true, session: data.session, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async signOut() {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut error:', err.message);
    }
  },

  async resetPassword(email) {
    if (!supabase) return { success: false, error: 'Supabase غير مهيأ' };
    try {
      const { error } = await supabase.auth.resetPasswordForEmail((email || '').trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/login`
      });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  onAuthStateChange(callback) {
    if (!supabase) return { unsubscribe: () => {} };
    return supabase.auth.onAuthStateChange(callback);
  },

  // ----------------------------------------------------------------------------
  // Wishlist (DB-backed for logged in users)
  // ----------------------------------------------------------------------------
  async getWishlist(userId) {
    if (!supabase || !userId) return null;
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id, created_at')
        .eq('user_id', userId);
      if (error) throw error;
      return (data || []).map(row => ({ productId: row.product_id, addedAt: row.created_at }));
    } catch (err) {
      console.warn('Supabase getWishlist error:', err.message);
      return null;
    }
  },

  async addWishlistItem(userId, productId) {
    if (!supabase || !userId || !productId) return { success: false, error: 'بيانات ناقصة' };
    try {
      const { error } = await supabase
        .from('wishlists')
        .upsert({ user_id: userId, product_id: productId }, { onConflict: 'user_id,product_id' });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  async removeWishlistItem(userId, productId) {
    if (!supabase || !userId || !productId) return { success: false, error: 'بيانات ناقصة' };
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  // ----------------------------------------------------------------------------
  // Order Tracking (RPC secured by order_number + phone)
  // ----------------------------------------------------------------------------
  async trackOrder(orderNumber, phone) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.rpc('track_order', {
        p_order_number: (orderNumber || '').trim(),
        p_phone: (phone || '').trim()
      });
      if (error) throw error;
      return Array.isArray(data) && data.length > 0 ? normalizeOrder(data[0]) : null;
    } catch (err) {
      console.warn('Supabase trackOrder error:', err.message);
      return null;
    }
  },

  // ----------------------------------------------------------------------------
  // Storage (File & Image Upload)
  // ----------------------------------------------------------------------------
  async uploadImage(bucket = 'product-images', file, pathPrefix = 'uploads') {
    if (!supabase || !file) return null;
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${pathPrefix}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Supabase uploadImage error:', err.message);
      return null;
    }
  },

  // ----------------------------------------------------------------------------
  // Settings
  // ----------------------------------------------------------------------------
  async getSettings() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'general_settings')
        .single();

      if (error) throw error;
      if (data) {
        return {
          storeName: data.site_name,
          logo: data.logo_url,
          tagline: data.tagline,
          whatsapp: data.whatsapp_number,
          phone: data.phone,
          email: data.email,
          address: data.address,
          socialLinks: data.social_links || {},
          facebook: data.social_links?.facebook || '',
          instagram: data.social_links?.instagram || '',
          tiktok: data.social_links?.tiktok || '',
          whatsappGovernorates: data.whatsapp_governorates || ['بني سويف'],
          freeShippingMin: Number(data.free_shipping_min),
          defaultDeliveryFee: Number(data.default_delivery_fee)
        };
      }
    } catch (err) {
      console.warn('Supabase getSettings error:', err.message);
      return null;
    }
  },

  async updateSettings(settings) {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({
          id: 'general_settings',
          site_name: settings.storeName,
          logo_url: settings.logo,
          tagline: settings.tagline,
          whatsapp_number: settings.whatsapp,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          social_links: settings.socialLinks || {},
          whatsapp_governorates: settings.whatsappGovernorates || ['بني سويف'],
          free_shipping_min: Number(settings.freeShippingMin),
          default_delivery_fee: Number(settings.defaultDeliveryFee)
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateSettings error:', err.message);
      return null;
    }
  },

  // ----------------------------------------------------------------------------
  // Realtime Subscriptions
  // ----------------------------------------------------------------------------
  subscribeToTable(table, callback) {
    if (!supabase) return { unsubscribe: () => {} };
    const channel = supabase
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, payload => {
        callback(payload);
      })
      .subscribe();

    return {
      unsubscribe: () => {
        supabase.removeChannel(channel);
      }
    };
  }
};
