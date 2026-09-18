-- ==============================================================================
-- أسواق مصر — Aswaaq Masr | Production-Ready Supabase PostgreSQL Database Schema
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. Helper Functions & Triggers
-- ==============================================================================

-- Function to auto-update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 2. Profiles Table (Extends Supabase Auth users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    governorate TEXT DEFAULT 'بني سويف',
    city TEXT DEFAULT 'مدينة بني سويف',
    address TEXT,
    role TEXT NOT NULL CHECK (role IN ('customer', 'admin', 'manager')) DEFAULT 'customer',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Trigger to create a profile automatically when a user registers in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        phone,
        avatar_url,
        role
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email,
        NEW.raw_user_meta_data->>'phone',
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
        COALESCE(NEW.raw_app_meta_data->>'role', 'customer')
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to auto-update 'updated_at' on profiles
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to check if the executing user is Admin or Manager
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'manager')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Delete an Auth user and its profile from the admin dashboard.
CREATE OR REPLACE FUNCTION public.delete_user_account(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Only admins can delete user accounts';
    END IF;

    DELETE FROM auth.users WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, auth;

-- ==============================================================================
-- 3. Categories Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 4. Brands Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar TEXT NOT NULL,
    name_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS set_brands_updated_at ON public.brands;
CREATE TRIGGER set_brands_updated_at
    BEFORE UPDATE ON public.brands
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 5. Products Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar TEXT NOT NULL,
    name_en TEXT,
    subcategory TEXT,
    slug TEXT UNIQUE NOT NULL,
    sku TEXT UNIQUE,
    description_ar TEXT,
    description_en TEXT,
    
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE SET NULL,
    
    price NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    compare_at_price NUMERIC(10,2) CHECK (compare_at_price IS NULL OR compare_at_price >= price),
    cost_price NUMERIC(10,2) DEFAULT 0,
    discount_percentage NUMERIC(5,2) DEFAULT 0,
    
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    low_stock_threshold INTEGER DEFAULT 5,
    
    main_image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    is_best_seller BOOLEAN DEFAULT false NOT NULL,
    is_new BOOLEAN DEFAULT false NOT NULL,
    
    rating NUMERIC(3,2) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 6. Product Images Gallery Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    is_primary BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 7. Orders Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    alternate_phone TEXT,
    governorate TEXT NOT NULL DEFAULT 'بني سويف',
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    
    payment_method TEXT NOT NULL DEFAULT 'الدفع عند الاستلام', -- 'الدفع عند الاستلام' | 'طلب مباشر عبر الواتساب'
    payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled')),
    
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
    discount NUMERIC(10,2) NOT NULL DEFAULT 0,
    shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    total NUMERIC(10,2) NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 8. Order Items Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_image TEXT,
    price NUMERIC(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    total_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 9. Coupons Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(10,2) NOT NULL,
    min_order_amount NUMERIC(10,2) DEFAULT 0,
    max_discount_amount NUMERIC(10,2),
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true NOT NULL,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9.1 Offers / Promotions Table (عروض المتجر)
CREATE TABLE IF NOT EXISTS public.offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    tag TEXT,
    banner_image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    link TEXT DEFAULT '/products',
    button_text TEXT DEFAULT 'تسوق العرض الآن',
    bg_gradient TEXT DEFAULT 'from-red-600 to-rose-800',
    badge TEXT,
    starts_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true NOT NULL,
    sort_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TRIGGER IF EXISTS set_offers_updated_at ON public.offers;
CREATE TRIGGER set_offers_updated_at
    BEFORE UPDATE ON public.offers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9.2 Wishlists Table (مزامنة المفضلة للمستخدمين المسجلين)
CREATE TABLE IF NOT EXISTS public.wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON public.wishlists(user_id);

-- ==============================================================================
-- 10. Site Settings Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'general_settings',
    site_name TEXT NOT NULL DEFAULT 'أسواق مصر',
    logo_url TEXT,
    tagline TEXT DEFAULT 'كل احتياجات بيتك في بني سويف بأفضل سعر وأسرع توصيل',
    whatsapp_number TEXT DEFAULT '201012345678',
    phone TEXT DEFAULT '19888',
    email TEXT DEFAULT 'info@aswaqmasr.com',
    address TEXT DEFAULT 'محافظة بني سويف - شارع عبد السلام عارف',
    social_links JSONB DEFAULT '{"facebook": "https://facebook.com/aswaqmasr", "instagram": "https://instagram.com/aswaqmasr", "tiktok": "https://tiktok.com/@aswaqmasr"}'::jsonb,
    whatsapp_governorates JSONB DEFAULT '["بني سويف"]'::jsonb,
    free_shipping_min NUMERIC(10,2) DEFAULT 500,
    default_delivery_fee NUMERIC(10,2) DEFAULT 20,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 11. Performance Indexes & Arabic Search
-- ==============================================================================
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory TEXT;
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS whatsapp_governorates JSONB DEFAULT '["بني سويف"]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON public.products(subcategory);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);
CREATE INDEX IF NOT EXISTS idx_offers_is_active ON public.offers(is_active);
CREATE INDEX IF NOT EXISTS idx_offers_sort_order ON public.offers(sort_order);

-- Fix order_status check constraint on pre-existing databases
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_order_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_order_status_check
    CHECK (order_status IN ('pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'));

-- ==============================================================================
-- 12. Row Level Security (RLS) Policies  —  SECURE: Admin writes ONLY via is_admin()
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- 12.0 Profiles Policies (owner OR admin)
DROP POLICY IF EXISTS "Public profiles are viewable by owner or admin" ON public.profiles;
CREATE POLICY "Public profiles are viewable by owner or admin"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
CREATE POLICY "Admins can delete profiles"
    ON public.profiles FOR DELETE
    USING (public.is_admin());

-- 12.1 Categories & Brands Policies (public read active, ADMIN ONLY writes)
DROP POLICY IF EXISTS "Public read active categories" ON public.categories;
CREATE POLICY "Public read active categories"
    ON public.categories FOR SELECT
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin insert categories" ON public.categories;
CREATE POLICY "Admin insert categories"
    ON public.categories FOR INSERT
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update categories" ON public.categories;
CREATE POLICY "Admin update categories"
    ON public.categories FOR UPDATE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete categories" ON public.categories;
CREATE POLICY "Admin delete categories"
    ON public.categories FOR DELETE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Public read active brands" ON public.brands;
CREATE POLICY "Public read active brands"
    ON public.brands FOR SELECT
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin insert brands" ON public.brands;
CREATE POLICY "Admin insert brands"
    ON public.brands FOR INSERT
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update brands" ON public.brands;
CREATE POLICY "Admin update brands"
    ON public.brands FOR UPDATE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete brands" ON public.brands;
CREATE POLICY "Admin delete brands"
    ON public.brands FOR DELETE
    USING (public.is_admin());

-- 12.2 Products & Images Policies (public read active, ADMIN ONLY writes)
DROP POLICY IF EXISTS "Public read active products" ON public.products;
CREATE POLICY "Public read active products"
    ON public.products FOR SELECT
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin insert products" ON public.products;
CREATE POLICY "Admin insert products"
    ON public.products FOR INSERT
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update products" ON public.products;
CREATE POLICY "Admin update products"
    ON public.products FOR UPDATE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete products" ON public.products;
CREATE POLICY "Admin delete products"
    ON public.products FOR DELETE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Public read product images" ON public.product_images;
CREATE POLICY "Public read product images"
    ON public.product_images FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admin insert product images" ON public.product_images;
CREATE POLICY "Admin insert product images"
    ON public.product_images FOR INSERT
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update product images" ON public.product_images;
CREATE POLICY "Admin update product images"
    ON public.product_images FOR UPDATE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete product images" ON public.product_images;
CREATE POLICY "Admin delete product images"
    ON public.product_images FOR DELETE
    USING (public.is_admin());

-- 12.3 Orders & Order Items Policies (guest checkout insert, owner/admin read, admin update)
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
CREATE POLICY "Public insert orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users view own orders or Admin view all" ON public.orders;
CREATE POLICY "Users view own orders or Admin view all"
    ON public.orders FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

DROP POLICY IF EXISTS "Admin update orders" ON public.orders;
CREATE POLICY "Admin update orders"
    ON public.orders FOR UPDATE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete orders" ON public.orders;
CREATE POLICY "Admin delete orders"
    ON public.orders FOR DELETE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Public insert order items" ON public.order_items;
CREATE POLICY "Public insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Public read order items" ON public.order_items;
CREATE POLICY "Public read order items"
    ON public.order_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.orders o
        WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.is_admin())
    ));

DROP POLICY IF EXISTS "Admin delete order items" ON public.order_items;
CREATE POLICY "Admin delete order items"
    ON public.order_items FOR DELETE
    USING (public.is_admin());

-- 12.4 Offers Policies (public read active, ADMIN ONLY writes)
DROP POLICY IF EXISTS "Public read active offers" ON public.offers;
CREATE POLICY "Public read active offers"
    ON public.offers FOR SELECT
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin insert offers" ON public.offers;
CREATE POLICY "Admin insert offers"
    ON public.offers FOR INSERT
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update offers" ON public.offers;
CREATE POLICY "Admin update offers"
    ON public.offers FOR UPDATE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete offers" ON public.offers;
CREATE POLICY "Admin delete offers"
    ON public.offers FOR DELETE
    USING (public.is_admin());

-- 12.5 Site Settings Policies (public read, ADMIN ONLY manage)
DROP POLICY IF EXISTS "Public read site settings" ON public.site_settings;
CREATE POLICY "Public read site settings"
    ON public.site_settings FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Admin insert site settings" ON public.site_settings;
CREATE POLICY "Admin insert site settings"
    ON public.site_settings FOR INSERT
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update site settings" ON public.site_settings;
CREATE POLICY "Admin update site settings"
    ON public.site_settings FOR UPDATE
    USING (public.is_admin());

-- 12.6 Coupons Policies (public read active, ADMIN ONLY manage)
DROP POLICY IF EXISTS "Public read active coupons" ON public.coupons;
CREATE POLICY "Public read active coupons"
    ON public.coupons FOR SELECT
    USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Admin insert coupons" ON public.coupons;
CREATE POLICY "Admin insert coupons"
    ON public.coupons FOR INSERT
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin update coupons" ON public.coupons;
CREATE POLICY "Admin update coupons"
    ON public.coupons FOR UPDATE
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete coupons" ON public.coupons;
CREATE POLICY "Admin delete coupons"
    ON public.coupons FOR DELETE
    USING (public.is_admin());

-- 12.7 Wishlists Policies (owner only)
DROP POLICY IF EXISTS "Users view own wishlist" ON public.wishlists;
CREATE POLICY "Users view own wishlist"
    ON public.wishlists FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own wishlist" ON public.wishlists;
CREATE POLICY "Users insert own wishlist"
    ON public.wishlists FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own wishlist" ON public.wishlists;
CREATE POLICY "Users delete own wishlist"
    ON public.wishlists FOR DELETE
    USING (auth.uid() = user_id);

-- 12.8 Secure Order Tracking RPC (guest tracking by order number + phone; no public table scan)
CREATE OR REPLACE FUNCTION public.track_order(p_order_number TEXT, p_phone TEXT)
RETURNS TABLE (
    id UUID,
    order_number TEXT,
    customer_name TEXT,
    phone TEXT,
    governorate TEXT,
    city TEXT,
    address TEXT,
    order_status TEXT,
    payment_method TEXT,
    subtotal NUMERIC,
    discount NUMERIC,
    shipping_cost NUMERIC,
    total NUMERIC,
    created_at TIMESTAMPTZ
) LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    RETURN QUERY
        SELECT o.id, o.order_number, o.customer_name, o.phone, o.governorate, o.city, o.address,
               o.order_status, o.payment_method, o.subtotal, o.discount, o.shipping_cost, o.total, o.created_at
        FROM public.orders o
        WHERE o.order_number = p_order_number
          AND o.phone = p_phone
        LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.track_order(text, text) TO anon, authenticated;

-- 12.9 Privilege Grants (RLS enforces the real authorization layer)
GRANT SELECT ON public.categories, public.brands, public.products, public.product_images,
    public.offers, public.site_settings, public.coupons, public.profiles,
    public.orders, public.order_items, public.wishlists TO anon, authenticated;

GRANT INSERT ON public.orders, public.order_items, public.profiles, public.wishlists TO anon, authenticated;

GRANT UPDATE ON public.profiles, public.wishlists TO authenticated;
GRANT DELETE ON public.wishlists TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user_account(UUID) TO authenticated;

-- ==============================================================================
-- 13. Supabase Storage Buckets Setup
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('product-images', 'product-images', true),
    ('brand-logos', 'brand-logos', true),
    ('category-images', 'category-images', true),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies (admin uploads for product/brand/category images; owners manage avatars)
DROP POLICY IF EXISTS "Public Access Bucket product-images" ON storage.objects;
CREATE POLICY "Public Access Bucket product-images" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admin Upload Bucket product-images" ON storage.objects;
CREATE POLICY "Admin Upload Bucket product-images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Update Bucket product-images" ON storage.objects;
CREATE POLICY "Admin Update Bucket product-images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'product-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Delete Bucket product-images" ON storage.objects;
CREATE POLICY "Admin Delete Bucket product-images" ON storage.objects
    FOR DELETE USING (bucket_id = 'product-images' AND public.is_admin());

DROP POLICY IF EXISTS "Public Access Bucket brand-logos" ON storage.objects;
CREATE POLICY "Public Access Bucket brand-logos" ON storage.objects
    FOR SELECT USING (bucket_id = 'brand-logos');

DROP POLICY IF EXISTS "Admin Upload Bucket brand-logos" ON storage.objects;
CREATE POLICY "Admin Upload Bucket brand-logos" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'brand-logos' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Update Bucket brand-logos" ON storage.objects;
CREATE POLICY "Admin Update Bucket brand-logos" ON storage.objects
    FOR UPDATE USING (bucket_id = 'brand-logos' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Delete Bucket brand-logos" ON storage.objects;
CREATE POLICY "Admin Delete Bucket brand-logos" ON storage.objects
    FOR DELETE USING (bucket_id = 'brand-logos' AND public.is_admin());

DROP POLICY IF EXISTS "Public Access Bucket category-images" ON storage.objects;
CREATE POLICY "Public Access Bucket category-images" ON storage.objects
    FOR SELECT USING (bucket_id = 'category-images');

DROP POLICY IF EXISTS "Admin Upload Bucket category-images" ON storage.objects;
CREATE POLICY "Admin Upload Bucket category-images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'category-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Update Bucket category-images" ON storage.objects;
CREATE POLICY "Admin Update Bucket category-images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'category-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admin Delete Bucket category-images" ON storage.objects;
CREATE POLICY "Admin Delete Bucket category-images" ON storage.objects
    FOR DELETE USING (bucket_id = 'category-images' AND public.is_admin());

DROP POLICY IF EXISTS "Public Access Bucket avatars" ON storage.objects;
CREATE POLICY "Public Access Bucket avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users Upload Own Avatar" ON storage.objects;
CREATE POLICY "Users Upload Own Avatar" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users Update Own Avatar" ON storage.objects;
CREATE POLICY "Users Update Own Avatar" ON storage.objects
    FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users Delete Own Avatar" ON storage.objects;
CREATE POLICY "Users Delete Own Avatar" ON storage.objects
    FOR DELETE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ==============================================================================
-- 14. Real Initial Seed Data (Categories, Brands, Products, Settings)
-- ==============================================================================

-- 14.1 Site Settings
INSERT INTO public.site_settings (
    id, site_name, logo_url, tagline, whatsapp_number, phone, email, address, free_shipping_min, default_delivery_fee
) VALUES (
    'general_settings',
    'أسواق مصر',
    '/logo-icon.svg',
    'كل احتياجات بيتك في بني سويف بأفضل سعر وأسرع توصيل',
    '201012345678',
    '19888',
    'info@aswaqmasr.com',
    'محافظة بني سويف - شارع عبد السلام عارف - بجوار البنك الأهلي',
    500.00,
    20.00
) ON CONFLICT (id) DO UPDATE SET
    site_name = EXCLUDED.site_name,
    tagline = EXCLUDED.tagline,
    whatsapp_number = EXCLUDED.whatsapp_number,
    address = EXCLUDED.address;

-- 14.2 Categories
INSERT INTO public.categories (id, name_ar, name_en, slug, description, image_url, sort_order)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'ألبان، أجبان وبيض', 'Dairy, Cheese & Eggs', 'dairy-eggs', 'حليب طازج، زبادي، أجبان طبيعية، بيض بلدي ومزارع طازج يومياً', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80', 1),
    ('c2222222-2222-2222-2222-222222222222', 'مواد غذائية ومؤن', 'Food Cupboard', 'food-cupboard', 'أرز، مكرونة، زيوت طعام، سمن بلدي، سكر، وبقوليات ممتازة', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80', 2),
    ('c3333333-3333-3333-3333-333333333333', 'منظفات وعناية بالمنزل', 'Cleaning & Household', 'cleaning-household', 'مساحيق غسيل أوتوماتيك، مطهرات، مناديل، صابون ومنظفات صحون', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80', 3),
    ('c4444444-4444-4444-4444-444444444444', 'مشروبات وعصائر', 'Beverages & Juices', 'beverages', 'عصائر طبيعية، شاي، بن تركي وأمريكي، مياه معدنية ومشروبات غازية', 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=80', 4),
    ('c5555555-5555-5555-5555-555555555555', 'سناكس وشوكولاتة', 'Snacks & Sweets', 'snacks-sweets', 'شيبسي مقرمش، شوكولاتة فاخرة، بسكويت ومكسرات طازجة', 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80', 5),
    ('c6666666-6666-6666-6666-666666666666', 'أجهزة منزلية وإلكترونيات', 'Appliances & Electronics', 'appliances', 'خلاطات، غلايات مياه، مكانس ومستلزمات المطبخ الحديثة', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', 6),
    ('c7777777-7777-7777-7777-777777777777', 'عناية شخصية وجمال', 'Personal Care', 'personal-care', 'شامبو، صابون استحمام، معجون أسنان وعناية بالبشرة', 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80', 7)
ON CONFLICT (id) DO NOTHING;

-- 14.3 Brands
INSERT INTO public.brands (id, name_ar, name_en, slug, description, logo_url)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'جهينة', 'Juhayna', 'juhayna', 'رواد منتجات الألبان والعصائر الطبيعية والزبادي في مصر بجودة عالمية', 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=200&q=80'),
    ('b2222222-2222-2222-2222-222222222222', 'كريستال', 'Crystal', 'crystal', 'زيوت نباتية وسمن نقي 100% عالي الجودة للطبخ الصحي', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=200&q=80'),
    ('b3333333-3333-3333-3333-333333333333', 'أريال', 'Ariel', 'ariel', 'المسحوق الرائد عالمياً في إزالة أصعب البقع ونظافة الملابس', 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=200&q=80'),
    ('b4444444-4444-4444-4444-444444444444', 'الملكة', 'El Maleka', 'el-maleka', 'مكرونة فاخرة من أجود أنواع قمح السيمولينا الصلب', 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=200&q=80'),
    ('b5555555-5555-5555-5555-555555555555', 'الضحى', 'El Doha', 'el-doha', 'أجود أنواع الأرز المعبأ آلياً والبقوليات والتوابل النقية', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80'),
    ('b6666666-6666-6666-6666-666666666666', 'تورنيدو', 'Tornado', 'tornado', 'أجهزة منزلية معتمدة من العربي جروب بكفاءة وأمان عالي', 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=200&q=80'),
    ('b7777777-7777-7777-7777-777777777777', 'كادبوري', 'Cadbury', 'cadbury', 'شوكولاتة الحليب الفاخرة والطعم الغني الأصيل', 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=200&q=80')
ON CONFLICT (id) DO NOTHING;

-- 14.4 Products
INSERT INTO public.products (
    id, name_ar, name_en, slug, sku, description_ar, description_en,
    category_id, brand_id, price, compare_at_price, cost_price, discount_percentage,
    stock_quantity, low_stock_threshold, main_image_url, is_active, is_featured, is_best_seller, is_new, rating, reviews_count
) VALUES
(
    'p1111111-1111-1111-1111-111111111111',
    'أرز مصري فاخر الضحى - 5 كجم',
    'El Doha Egyptian Rice - 5kg',
    'el-doha-egyptian-rice-5kg',
    'DOH-RICE-5KG',
    'أرز مصري درجة أولى منقى ومغسول إلكترونياً بأعلى معايير الجودة والنقاء، حبة عريضة متماسكة لا تعجن ومثالية لجميع الأطباق والولائم.',
    'Premium Egyptian white rice 100% natural, sorted and washed electronically.',
    'c2222222-2222-2222-2222-222222222222',
    'b5555555-5555-5555-5555-555555555555',
    185.00, 220.00, 150.00, 15.91,
    50, 10,
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    true, true, true, false, 4.9, 142
),
(
    'p2222222-2222-2222-2222-222222222222',
    'حليب جهينة كامل الدسم - 1 لتر (عبوة 6 قطع)',
    'Juhayna Full Cream Milk 1L - Pack of 6',
    'juhayna-full-cream-milk-pack-6',
    'JUH-MILK-FULL-6X1',
    'حليب بقري طبيعي 100% مبستر ومعقم بأحدث التقنيات للحفاظ على الفيتامينات والكالسيوم الطبيعي. طعم غني ومثالي للأسرة والقهوة.',
    '100% natural pure cow milk, pasteurized UHT.',
    'c1111111-1111-1111-1111-111111111111',
    'b1111111-1111-1111-1111-111111111111',
    240.00, 275.00, 200.00, 12.73,
    35, 8,
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    true, true, true, false, 4.8, 98
),
(
    'p3333333-3333-3333-3333-333333333333',
    'زبادي جهينة طبيعي كامل الدسم - عبوة 12 علبة',
    'Juhayna Natural Yogurt 105g - Pack of 12',
    'juhayna-natural-yogurt-pack-12',
    'JUH-YOGURT-NAT-12',
    'زبادي جهينة الطبيعي بقوام كريمي متماسك ولذيذ، غني بالبروبيوتيك وخمائر الزبادي الحية المفيدة للهضم وصحة العائلة.',
    'Delicious creamy natural yogurt enriched with live probiotics.',
    'c1111111-1111-1111-1111-111111111111',
    'b1111111-1111-1111-1111-111111111111',
    85.00, 105.00, 68.00, 19.05,
    60, 15,
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    true, true, true, true, 4.9, 87
),
(
    'p4444444-4444-4444-4444-444444444444',
    'مسحوق غسيل أوتوماتيك أريال لافندر - 4 كجم',
    'Ariel Automatic Laundry Detergent Lavender - 4kg',
    'ariel-automatic-lavender-4kg',
    'ARIEL-AUTO-4KG',
    'يقضي على أصعب البقع في غسلة واحدة حتى في الماء البارد مع انتعاش عطر اللافندر الفرنسي الذي يدوم طويلاً على الملابس البيضاء والملونة.',
    'Deep clean automatic powder with fresh lavender fragrance.',
    'c3333333-3333-3333-3333-333333333333',
    'b3333333-3333-3333-3333-333333333333',
    310.00, 380.00, 260.00, 18.42,
    45, 10,
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
    true, true, true, false, 4.9, 215
),
(
    'p5555555-5555-5555-5555-555555555555',
    'زيت عباد الشمس كريستال نقي - 2.2 لتر',
    'Crystal Pure Sunflower Oil - 2.2L',
    'crystal-sunflower-oil-2-2l',
    'CRYS-SUN-2.2L',
    'زيت عباد شمس مكرر ونقي 100% معزز بفيتامين A و D، خفيف على المعدة وخالٍ من الكوليسترول، مناسب للقلي والطبخ وإعداد السلطات.',
    '100% refined sunflower oil enriched with vitamins.',
    'c2222222-2222-2222-2222-222222222222',
    'b2222222-2222-2222-2222-222222222222',
    195.00, 230.00, 165.00, 15.22,
    60, 12,
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    true, true, true, false, 4.7, 84
),
(
    'p6666666-6666-6666-6666-666666666666',
    'غلاية مياه ستانلس ستيل تورنيدو - 1.7 لتر 2200 وات',
    'Tornado Stainless Steel Kettle 1.7L 2200W',
    'tornado-kettle-1-7l-2200w',
    'TORN-KET-1.7L',
    'غلاية تورنيدو من الفولاذ المقاوم للصدأ الصحي عالي المتانة، قدرة 2200 وات لغليان فائق السرعة مع قاعدة تدور 360 درجة وفصل تلقائي آمن.',
    'Durable hygienic stainless steel kettle with fast boil 2200W.',
    'c6666666-6666-6666-6666-666666666666',
    'b6666666-6666-6666-6666-666666666666',
    450.00, 560.00, 370.00, 19.64,
    20, 5,
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    true, true, false, true, 4.9, 63
),
(
    'p7777777-7777-7777-7777-777777777777',
    'شوكولاتة كادبوري ديري ميلك سادة - عرض 3 قطع',
    'Cadbury Dairy Milk Chocolate Plain - 3 Bars',
    'cadbury-dairy-milk-plain-3pack',
    'CAD-DM-3X90G',
    'شوكولاتة الحليب الناعمة والشهيرة من كادبوري مصنوعة من كوب ونصف من الحليب الطازج في كل لوح لتذوب في الفم بسلاسة فائقة.',
    'Classic creamy Cadbury Dairy Milk chocolate bars pack.',
    'c5555555-5555-5555-5555-555555555555',
    'b7777777-7777-7777-7777-777777777777',
    95.00, 120.00, 75.00, 20.83,
    80, 15,
    'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    true, true, false, true, 4.9, 134
)
ON CONFLICT (id) DO NOTHING;

-- 14.5 Product Images
INSERT INTO public.product_images (id, product_id, image_url, sort_order, is_primary)
VALUES
    ('i1111111-1111-1111-1111-111111111111', 'p1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', 1, true),
    ('i2222222-2222-2222-2222-222222222222', 'p2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80', 1, true),
    ('i3333333-3333-3333-3333-333333333333', 'p3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80', 1, true),
    ('i4444444-4444-4444-4444-444444444444', 'p4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80', 1, true),
    ('i5555555-5555-5555-5555-555555555555', 'p5555555-5555-5555-5555-555555555555', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80', 1, true)
ON CONFLICT (id) DO NOTHING;

-- 14.6 Active Coupons
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_amount, usage_limit, is_active)
VALUES 
    ('MASR10', 'percentage', 10.00, 200.00, 500, true),
    ('BENISUEF20', 'fixed', 20.00, 300.00, 200, true),
    ('WELCOME', 'percentage', 15.00, 150.00, 1000, true)
-- 14.7 Active Offers (عروض المتجر النشطة)
INSERT INTO public.offers (id, title, subtitle, tag, banner_image_url, link, button_text, bg_gradient, badge, sort_order, is_active)
VALUES
    ('0f000000-0000-4000-8000-000000000001', 'عروض السوبرماركت الكبرى', 'وفر حتى 35% على المواد الغذائية ومؤن البيت الأساسية', 'خصم يصل إلى 35%', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80', '/category/food-cupboard', 'تسوق عروض المؤن', 'from-red-600 to-rose-800', 'صفقة الأسبوع', 1, true),
    ('0f000000-0000-4000-8000-000000000002', 'مهرجان النظافة وحماية المنزل', 'أقوى مساحيق الغسيل والمطهرات بأسعار الجملة المباشرة', 'اشترِ 2 واحصل على 1 مجاناً', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1200&q=80', '/category/cleaning-household', 'اكتشف عروض المنظفات', 'from-blue-600 to-indigo-900', 'عرض حصري', 2, true),
    ('0f000000-0000-4000-8000-000000000003', 'عالم المشروبات والقهوة المنعشة', 'تخفيضات مذهلة على أنواع البن الفاخر والشاي والعصائر الطبيعية', 'خصم 25%', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80', '/category/beverages', 'تسوق المشروبات الآن', 'from-amber-600 to-orange-900', 'الأكثر طلباً', 3, true),
    ('0f000000-0000-4000-8000-000000000004', 'عناية كاملة بطفلك وراحتك', 'عروض التوفير على الحفاضات ومنتجات الرضع من كبرى العلامات العالمية', 'توفير حتى 30%', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80', '/category/baby-care', 'تصفح عروض الأطفال', 'from-teal-600 to-emerald-900', 'عرض خاص', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 14.8 How to promote a user to Admin (run manually via SQL editor ONCE after signup):
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
-- NOTE: role is NEVER read from user_metadata. It lives ONLY in public.profiles (DB-backed).
