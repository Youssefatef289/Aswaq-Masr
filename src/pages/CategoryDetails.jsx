import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilter } from '../components/product/ProductFilter';
import { useAdminData } from '../context/AdminDataContext';
import { SlidersHorizontal, ArrowUpDown, Layers } from 'lucide-react';

export const CategoryDetails = () => {
  const { id } = useParams();
  const { categories, products, brands } = useAdminData();

  const category = categories.find((c) => c.id === id) || categories[0];

  // Filters State
  const [selectedSubCat, setSelectedSubCat] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = p.categoryId === category?.id;
        const matchesBrand = selectedBrand === 'all' || p.brandId === selectedBrand;
        const matchesPrice = p.price <= priceRange;
        const matchesRating = minRating === 0 || (p.rating || 0) >= minRating;
        const matchesDiscount = !onlyDiscount || (p.discount > 0 || (p.oldPrice && p.oldPrice > p.price));
        const matchesStock = !onlyInStock || (p.stock !== undefined ? p.stock > 0 : true);

        return (
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
        return 0; // default popular / order
      });
  }, [products, category, selectedBrand, priceRange, minRating, onlyDiscount, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedSubCat('all');
    setSelectedBrand('all');
    setPriceRange(2000);
    setMinRating(0);
    setOnlyDiscount(false);
    setOnlyInStock(false);
    setSortBy('popular');
  };

  if (!category) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">القسم غير موجود</h2>
        <Link to="/categories" className="text-brand-red font-bold underline mt-2 block">
          العودة لقائمة الأقسام
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'الأقسام', to: '/categories' },
          { label: category.name }
        ]}
      />

      {/* Category Cover Banner (1200x300) */}
      <div className="relative rounded-3xl overflow-hidden aspect-[1200/300] min-h-[180px] sm:min-h-[220px] max-h-[300px] w-full bg-gray-900 shadow-md">
        <img
          src={category.coverImage || category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent flex items-center p-6 sm:p-10">
          <div className="max-w-xl text-white space-y-2">
            <span className="inline-block bg-brand-red text-white text-[11px] font-extrabold px-3 py-1 rounded-full">
              قسم رئيسي
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white">{category.name}</h1>
            <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 max-w-lg font-normal">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Sub-categories Buttons */}
      {category.subCategories && category.subCategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSubCat('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedSubCat === 'all'
                ? 'bg-brand-red text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            الكل في {category.name}
          </button>
          {category.subCategories.map((sub, i) => (
            <button
              key={i}
              onClick={() => setSelectedSubCat(sub)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedSubCat === sub
                  ? 'bg-brand-red text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Content Layout with Sidebar & Products */}
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
              <option value="popular">الأكثر شهرة</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="discount">أكبر الخصومات</option>
            </select>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
          <ProductFilter
            brands={brands}
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
            hideCategoryFilter={true}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Desktop Toolbar */}
          <div className="hidden lg:flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold text-gray-600">
              تم العثور على <strong className="text-brand-red">{filteredProducts.length}</strong> منتج
            </span>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-semibold">ترتيب حسب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red cursor-pointer"
              >
                <option value="popular">الأكثر شعبية والافتراضي</option>
                <option value="price-low">السعر: من الأقل إلى الأعلى</option>
                <option value="price-high">السعر: من الأعلى إلى الأقل</option>
                <option value="rating">الأعلى تقييماً من العملاء</option>
                <option value="discount">أعلى نسبة خصم وتوفير</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <ProductGrid
            products={filteredProducts}
            columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          />
        </div>
      </div>
    </div>
  );
};

