-- ================================================================
-- Supabase Database Schema for "أسواق مصر" (Aswaaq Masr)
-- ================================================================

-- 1. Create Tables

-- Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Brands Table
CREATE TABLE IF NOT EXISTS public.brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    brand TEXT REFERENCES public.brands(id) ON DELETE SET NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    old_price NUMERIC,
    discount NUMERIC DEFAULT 0,
    image_url TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    description TEXT,
    stock INTEGER DEFAULT 50,
    sku TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    governorate TEXT NOT NULL DEFAULT 'بني سويف',
    city TEXT,
    total_amount NUMERIC NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    payment_method TEXT DEFAULT 'الدفع عند الاستلام',
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user', -- 'admin' | 'user'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'general_settings',
    site_name TEXT NOT NULL DEFAULT 'أسواق مصر',
    logo TEXT,
    slogan TEXT DEFAULT 'كل احتياجات بيتك في بني سويف بأفضل سعر وأسرع توصيل',
    whatsapp_number TEXT DEFAULT '201012345678',
    email TEXT DEFAULT 'info@aswaqmasr.com',
    address TEXT DEFAULT 'بني سويف، جمهورية مصر العربية',
    social_links JSONB DEFAULT '{"facebook": "https://facebook.com/aswaqmasr", "instagram": "https://instagram.com/aswaqmasr", "tiktok": "https://tiktok.com/@aswaqmasr"}'::jsonb,
    free_shipping_min NUMERIC DEFAULT 500,
    delivery_fee NUMERIC DEFAULT 20,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Indexes for High Performance & Arabic Search
CREATE INDEX IF NOT EXISTS idx_products_title ON public.products USING gin(to_tsvector('simple', title));
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- 3. Row Level Security (RLS) & Public Policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read for Storefront
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);

-- Allow All Operations (for Admin with Anon or Authenticated key)
CREATE POLICY "Allow all categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Allow all brands" ON public.brands FOR ALL USING (true);
CREATE POLICY "Allow all products" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow all orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow all users" ON public.users FOR ALL USING (true);
CREATE POLICY "Allow all settings" ON public.settings FOR ALL USING (true);

-- 4. Initial Seed Data
INSERT INTO public.settings (id, site_name, logo, slogan, whatsapp_number, email, address, social_links, free_shipping_min, delivery_fee)
VALUES (
    'general_settings',
    'أسواق مصر',
    '/public/logo-icon.svg',
    'كل احتياجات بيتك في بني سويف بأفضل سعر وأسرع توصيل',
    '201012345678',
    'info@aswaqmasr.com',
    'بني سويف - شارع عبد السلام عارف - بجوار البنك الأهلي',
    '{"facebook": "https://facebook.com/aswaqmasr", "instagram": "https://instagram.com/aswaqmasr", "whatsapp": "https://wa.me/201012345678"}'::jsonb,
    500,
    20
) ON CONFLICT (id) DO NOTHING;

-- Admin User Seed
INSERT INTO public.users (id, full_name, email, phone, role)
VALUES ('admin_1', 'Admin', 'admin@aswaqmasr.com', '01012345678', 'admin')
ON CONFLICT (id) DO NOTHING;

