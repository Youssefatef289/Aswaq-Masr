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
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to handle Supabase query or fallback
export const supabaseService = {
  // Products
  async getProducts() {
    if (supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(item => ({
          ...item,
          name: item.title || item.name,
          categoryId: item.category,
          brandId: item.brand,
          images: Array.isArray(item.images) ? item.images : [item.image_url]
        }));
      }
    }
    return null;
  },

  async addProduct(product) {
    if (supabase) {
      const dbProduct = {
        id: product.id || 'prod-' + Date.now(),
        title: product.name,
        category: product.categoryId,
        brand: product.brandId,
        price: Number(product.price),
        old_price: product.oldPrice ? Number(product.oldPrice) : null,
        discount: product.discount ? Number(product.discount) : 0,
        image_url: product.images?.[0] || product.image,
        images: product.images || [product.image],
        description: product.description,
        stock: Number(product.stock) || 50,
        sku: product.sku,
        is_featured: !!product.isFeatured,
        is_bestseller: !!product.isBestSeller
      };
      const { data, error } = await supabase.from('products').insert([dbProduct]).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  async updateProduct(id, updates) {
    if (supabase) {
      const dbUpdates = {};
      if (updates.name) dbUpdates.title = updates.name;
      if (updates.categoryId) dbUpdates.category = updates.categoryId;
      if (updates.brandId) dbUpdates.brand = updates.brandId;
      if (updates.price !== undefined) dbUpdates.price = Number(updates.price);
      if (updates.oldPrice !== undefined) dbUpdates.old_price = updates.oldPrice ? Number(updates.oldPrice) : null;
      if (updates.discount !== undefined) dbUpdates.discount = Number(updates.discount);
      if (updates.stock !== undefined) dbUpdates.stock = Number(updates.stock);
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.sku !== undefined) dbUpdates.sku = updates.sku;
      if (updates.images) {
        dbUpdates.images = updates.images;
        dbUpdates.image_url = updates.images[0];
      }
      const { data, error } = await supabase.from('products').update(dbUpdates).eq('id', id).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  async deleteProduct(id) {
    if (supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      return !error;
    }
    return true;
  },

  // Categories
  async getCategories() {
    if (supabase) {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data && data.length > 0) {
        return data.map(c => ({
          ...c,
          image: c.image_url || c.image
        }));
      }
    }
    return null;
  },

  async addCategory(cat) {
    if (supabase) {
      const { data, error } = await supabase.from('categories').insert([{
        id: cat.id,
        name: cat.name,
        slug: cat.slug || cat.id,
        image_url: cat.image
      }]).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  async updateCategory(id, updates) {
    if (supabase) {
      const { data, error } = await supabase.from('categories').update({
        name: updates.name,
        slug: updates.slug,
        image_url: updates.image
      }).eq('id', id).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  async deleteCategory(id) {
    if (supabase) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      return !error;
    }
    return true;
  },

  // Brands
  async getBrands() {
    if (supabase) {
      const { data, error } = await supabase.from('brands').select('*');
      if (!error && data && data.length > 0) {
        return data.map(b => ({
          ...b,
          logo: b.logo_url || b.logo
        }));
      }
    }
    return null;
  },

  async addBrand(brand) {
    if (supabase) {
      const { data, error } = await supabase.from('brands').insert([{
        id: brand.id,
        name: brand.name,
        logo_url: brand.logo,
        description: brand.description
      }]).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  async updateBrand(id, updates) {
    if (supabase) {
      const { data, error } = await supabase.from('brands').update({
        name: updates.name,
        logo_url: updates.logo,
        description: updates.description
      }).eq('id', id).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  async deleteBrand(id) {
    if (supabase) {
      const { error } = await supabase.from('brands').delete().eq('id', id);
      return !error;
    }
    return true;
  },

  // Orders
  async getOrders() {
    if (supabase) {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(o => ({
          ...o,
          customerName: o.customer_name,
          total: o.total_amount,
          date: o.created_at,
          paymentMethod: o.payment_method
        }));
      }
    }
    return null;
  },

  async createOrder(order) {
    if (supabase) {
      const dbOrder = {
        id: order.id,
        customer_name: order.customerName,
        phone: order.phone,
        address: order.address,
        governorate: order.governorate || 'بني سويف',
        city: order.city,
        total_amount: Number(order.total),
        items: order.items,
        payment_method: order.paymentMethod,
        status: order.status || 'pending',
        notes: order.notes
      };
      const { data, error } = await supabase.from('orders').insert([dbOrder]).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  async updateOrderStatus(orderId, status) {
    if (supabase) {
      const { data, error } = await supabase.from('orders').update({ status }).eq('id', orderId).select();
      if (!error && data) return data[0];
    }
    return null;
  },

  // Settings
  async getSettings() {
    if (supabase) {
      const { data, error } = await supabase.from('settings').select('*').limit(1).single();
      if (!error && data) {
        return {
          storeName: data.site_name,
          logo: data.logo,
          tagline: data.slogan,
          whatsapp: data.whatsapp_number,
          email: data.email,
          address: data.address,
          socialLinks: data.social_links || {},
          freeShippingMin: data.free_shipping_min,
          defaultDeliveryFee: data.delivery_fee
        };
      }
    }
    return null;
  },

  async updateSettings(settings) {
    if (supabase) {
      const { data, error } = await supabase.from('settings').upsert({
        id: 'general_settings',
        site_name: settings.storeName,
        logo: settings.logo,
        slogan: settings.tagline,
        whatsapp_number: settings.whatsapp,
        email: settings.email,
        address: settings.address,
        social_links: settings.socialLinks || {},
        free_shipping_min: Number(settings.freeShippingMin),
        delivery_fee: Number(settings.defaultDeliveryFee)
      }).select();
      if (!error && data) return data[0];
    }
    return null;
  }
};
