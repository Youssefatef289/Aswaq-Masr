import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BottomNav } from '../components/common/BottomNav';
import { CartDrawer } from '../components/cart/CartDrawer';
import { FloatingContactWidget } from '../components/common/FloatingContactWidget';

export const MainLayout = () => {
  const { pathname } = useLocation();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#171717] relative">
      {/* Top Header */}
      <Header onOpenCart={() => setIsCartDrawerOpen(true)} />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Redesigned Centered Footer */}
      <Footer />

      {/* Floating Side Quick Contact Widget */}
      <FloatingContactWidget />

      {/* Mobile Bottom Navigation */}
      <BottomNav onOpenCart={() => setIsCartDrawerOpen(true)} />

      {/* Slide-over Cart & In-Drawer Checkout Modal */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
    </div>
  );
};
