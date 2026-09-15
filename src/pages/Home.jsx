import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowLeft, Star, TrendingUp, PackagePlus } from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { CategoriesGrid } from '../components/home/CategoriesGrid';
import { FeaturedOffers } from '../components/home/FeaturedOffers';
import { BrandsSlider } from '../components/home/BrandsSlider';
import { PromotionalBanner } from '../components/home/PromotionalBanner';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { ProductGrid } from '../components/product/ProductGrid';
import { useAdminData } from '../context/AdminDataContext';

export const Home = () => {
  const { products } = useAdminData();

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew || !p.isBestSeller).slice(0, 8);

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Categories Section */}
      <CategoriesGrid />

      {/* 3. Featured Offers Section */}
      <FeaturedOffers />

      {/* 4. Best Selling Products */}
      <section className="py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-brand-red font-bold text-xs sm:text-sm mb-1">
              <Flame className="w-4 h-4 fill-brand-red text-brand-red" />
              <span>المنتجات المفضلة لدى عملائنا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              الأكثر مبيعاً في مصر
            </h2>
          </div>

          <Link
            to="/products?sort=bestseller"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-darkRed transition"
          >
            <span>عرض المزيد</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={bestSellers} />
      </section>

      {/* 5. Promotional Red Banner */}
      <PromotionalBanner />

      {/* 6. New Arrivals */}
      <section className="py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs sm:text-sm mb-1">
              <PackagePlus className="w-4 h-4" />
              <span>أحدث الإضافات لمتجرنا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              وصل حديثاً
            </h2>
          </div>

          <Link
            to="/products?sort=newest"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-darkRed transition"
          >
            <span>عرض كل الجديد</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} />
      </section>

      {/* 7. Brands Section */}
      <BrandsSlider />

      {/* 8. Trust & Features Section */}
      <FeaturesSection />
    </div>
  );
};

