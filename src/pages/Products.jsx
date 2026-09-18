import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilter } from '../components/product/ProductFilter';
import { useAdminData } from '../context/AdminDataContext';
import { Search, SlidersHorizontal, ArrowUpDown, Tag, Sparkles } from 'lucide-react';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, brands } = useAdminData();

  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'all';
  const urlBrand = searchParams.get('brand') || 'all';
  const urlSort = searchParams.get('sort') || 'popular';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedBrand, setSelectedBrand] = useState(urlBrand);
  const [priceRange, setPriceRange] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState(urlSort);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (urlSearch) setSearchTerm(urlSearch);
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlBrand) setSelectedBrand(urlBrand);
  }, [urlSearch, urlCategory, urlBrand]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.brandName.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.subcategory?.toLowerCase().includes(query);

        const matchesCategory =
          selectedCategory === 'all' || p.categoryId === selectedCategory;
        const matchesBrand =
          selectedBrand === 'all' || p.brandId === selectedBrand;
        const matchesPrice = p.price <= priceRange;
        const matchesRating = minRating === 0 || (p.rating || 0) >= minRating;
        const matchesDiscount =
          !onlyDiscount ||
          p.discount > 0 ||
          (p.oldPrice && p.oldPrice > p.price);
        const matchesStock =
          !onlyInStock || (p.stock !== undefined ? p.stock > 0 : true);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBrand &&
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
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0;
      });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    minRating,
    onlyDiscount,
    onlyInStock,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange(2000);
    setMinRating(0);
    setOnlyDiscount(false);
    setOnlyInStock(false);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'كل المنتجات' }]} />

      {/* Page Title & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            جميع منتجات أسواق مصر
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            تسوق من بين أكثر من 500+ صنف منتقى بعناية لمنزلك وعائلتك
          </p>
        </div>

        {/* In-page quick search */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="تصفية بالاسم أو الماركة..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-red focus:bg-white"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Layout Grid with Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-xs font-bold text-gray-800"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-red" />
            <span>فلترة المنتجات ({filteredProducts.length})</span>
          </button>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold bg-transparent focus:outline-none text-gray-700"
            >
              <option value="popular">الافتراضي</option>
              <option value="bestseller">الأكثر مبيعاً</option>
              <option value="newest">وصل حديثاً</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="discount">أكبر الخصومات</option>
            </select>
          </div>
        </div>

        {/* Sidebar Filters */}
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
          <ProductFilter
            categories={categories}
            brands={brands}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            onlyDiscount={onlyDiscount}
            onDiscountChange={setOnlyDiscount}
            onlyInStock={onlyInStock}
            onStockChange={setOnlyInStock}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Main Product Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Info Bar */}
          <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">
                النتائج المعروضة: <strong className="text-brand-red font-black">{filteredProducts.length}</strong> منتج
              </span>
              {searchTerm && (
                <span className="text-xs bg-red-50 text-brand-red font-bold px-2 py-0.5 rounded">
                  بحث: "{searchTerm}"
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-semibold">ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red cursor-pointer"
              >
                <option value="popular">الافتراضي والشائع</option>
                <option value="bestseller">الأكثر مبيعاً</option>
                <option value="newest">أحدث المنتجات</option>
                <option value="price-low">السعر: من الأقل إلى الأعلى</option>
                <option value="price-high">السعر: من الأعلى إلى الأقل</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="discount">أعلى نسبة خصم</option>
              </select>
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          />
        </div>
      </div>
    </div>
  );
};

