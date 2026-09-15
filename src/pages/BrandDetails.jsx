import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilter } from '../components/product/ProductFilter';
import { useAdminData } from '../context/AdminDataContext';
import { SlidersHorizontal, ArrowUpDown, Award } from 'lucide-react';

export const BrandDetails = () => {
  const { id } = useParams();
  const { brands, products, categories } = useAdminData();

  const brand = brands.find((b) => b.id === id) || brands[0];

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesBrand = p.brandId === brand?.id;
        const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
        const matchesPrice = p.price <= priceRange;
        const matchesRating = minRating === 0 || (p.rating || 0) >= minRating;
        const matchesDiscount = !onlyDiscount || (p.discount > 0 || (p.oldPrice && p.oldPrice > p.price));
        const matchesStock = !onlyInStock || (p.stock !== undefined ? p.stock > 0 : true);

        return (
          matchesBrand &&
          matchesCategory &&
          matchesPrice &&
          matchesRating &&
          matchesDiscount &&
          matchesStock
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
        return 0;
      });
  }, [products, brand, selectedCategory, priceRange, minRating, onlyDiscount, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(2000);
    setMinRating(0);
    setOnlyDiscount(false);
    setOnlyInStock(false);
    setSortBy('popular');
  };

  if (!brand) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">البراند غير موجود</h2>
        <Link to="/brands" className="text-brand-red font-bold underline mt-2 block">
          العودة لقائمة البراندات
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'البراندات', to: '/brands' },
          { label: brand.name }
        ]}
      />

      {/* Brand Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-50 flex items-center justify-center p-3 border border-gray-100 shrink-0 shadow-xs">
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="text-center md:text-right flex-1 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-brand-red text-xs font-bold px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            <span>ماركة أصلية وموثوقة في مصر</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{brand.name}</h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
            {brand.description || 'تسوق جميع منتجات الماركة بأفضل جودة وسعر متاح.'}
          </p>
        </div>
      </div>

      {/* Grid with Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-xs font-bold text-gray-800"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-red" />
            <span>فلترة منتجات {brand.name} ({filteredProducts.length})</span>
          </button>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold bg-transparent focus:outline-none text-gray-700"
            >
              <option value="popular">الأكثر شهرة</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="discount">أكبر الخصومات</option>
            </select>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            onlyDiscount={onlyDiscount}
            onDiscountChange={setOnlyDiscount}
            onlyInStock={onlyInStock}
            onStockChange={setOnlyInStock}
            onResetFilters={resetFilters}
            hideBrandFilter={true}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold text-gray-600">
              منتجات <strong className="text-brand-red">{brand.name}</strong> ({filteredProducts.length} منتج)
            </span>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-semibold">ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red cursor-pointer"
              >
                <option value="popular">الأكثر شهرة</option>
                <option value="price-low">السعر: من الأقل إلى الأعلى</option>
                <option value="price-high">السعر: من الأعلى إلى الأقل</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="discount">أعلى نسبة خصم</option>
              </select>
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          />
        </div>
      </div>
    </div>
  );
};

