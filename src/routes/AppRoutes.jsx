import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Store Pages
import { Home } from '../pages/Home';
import { Categories } from '../pages/Categories';
import { CategoryDetails } from '../pages/CategoryDetails';
import { Products } from '../pages/Products';
import { Brands } from '../pages/Brands';
import { BrandDetails } from '../pages/BrandDetails';
import { Offers } from '../pages/Offers';
import { ProductDetails } from '../pages/ProductDetails';
import { Cart } from '../pages/Cart';
import { Checkout } from '../pages/Checkout';
import { OrderConfirmation } from '../pages/OrderConfirmation';
import { TrackOrder } from '../pages/TrackOrder';
import { Wishlist } from '../pages/Wishlist';

// Auth Pages
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ForgotPassword } from '../pages/ForgotPassword';

// Admin Pages
import { Dashboard } from '../pages/admin/Dashboard';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminCategories } from '../pages/admin/AdminCategories';
import { AdminBrands } from '../pages/admin/AdminBrands';
import { AdminOffers } from '../pages/admin/AdminOffers';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { AdminCustomers } from '../pages/admin/AdminCustomers';
import { AdminSettings } from '../pages/admin/AdminSettings';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Storefront Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<CategoryDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:id" element={<BrandDetails />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderConfirmation />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>

      {/* 2. Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* 3. Admin Dashboard Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="brands" element={<AdminBrands />} />
        <Route path="offers" element={<AdminOffers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

