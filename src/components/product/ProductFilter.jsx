import React from 'react';
import { Filter, RotateCcw, Check, Star } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const ProductFilter = ({
  categories = [],
  brands = [],
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  priceRange,
  onPriceChange,
  minPrice = 0,
  maxPrice = 2000,
  minRating,
  onRatingChange,
  onlyDiscount,
  onDiscountChange,
  onlyInStock,
  onStockChange,
  onResetFilters,
  hideCategoryFilter = false,
  hideBrandFilter = false
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 divide-y divide-gray-100 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-brand-red" />
          <h3 className="text-sm font-bold text-gray-900">تصفية النتائج</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-gray-500 hover:text-brand-red flex items-center gap-1 font-semibold transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة ضبط</span>
        </button>
      </div>

      {/* Price Filter */}
      <div className="pt-4">
        <h4 className="text-xs font-bold text-gray-800 mb-3">السعر (ج.م)</h4>
        <div className="space-y-3">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={priceRange}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full accent-brand-red cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-gray-600 font-bold">
            <span>{formatPrice(minPrice)}</span>
            <span className="text-brand-red bg-brand-lightRed px-2 py-0.5 rounded font-black">
              حتى {formatPrice(priceRange)}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      {!hideCategoryFilter && categories.length > 0 && (
        <div className="pt-4">
          <h4 className="text-xs font-bold text-gray-800 mb-2.5">الأقسام</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => onSelectCategory('all')}
              className={`w-full text-right text-xs py-1.5 px-2.5 rounded-lg flex items-center justify-between transition ${
                selectedCategory === 'all'
                  ? 'bg-brand-lightRed text-brand-red font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>جميع الأقسام</span>
              {selectedCategory === 'all' && <Check className="w-3.5 h-3.5" />}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-right text-xs py-1.5 px-2.5 rounded-lg flex items-center justify-between transition ${
                  selectedCategory === cat.id
                    ? 'bg-brand-lightRed text-brand-red font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brands Filter */}
      {!hideBrandFilter && brands.length > 0 && (
        <div className="pt-4">
          <h4 className="text-xs font-bold text-gray-800 mb-2.5">البراندات والمصنعين</h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <button
              onClick={() => onSelectBrand('all')}
              className={`w-full text-right text-xs py-1.5 px-2.5 rounded-lg flex items-center justify-between transition ${
                selectedBrand === 'all'
                  ? 'bg-brand-lightRed text-brand-red font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>جميع الماركات</span>
              {selectedBrand === 'all' && <Check className="w-3.5 h-3.5" />}
            </button>
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onSelectBrand(brand.id)}
                className={`w-full text-right text-xs py-1.5 px-2.5 rounded-lg flex items-center justify-between transition ${
                  selectedBrand === brand.id
                    ? 'bg-brand-lightRed text-brand-red font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="truncate">{brand.name}</span>
                {selectedBrand === brand.id && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Rating Filter */}
      <div className="pt-4">
        <h4 className="text-xs font-bold text-gray-800 mb-2.5">التقييم</h4>
        <div className="space-y-1">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => onRatingChange(minRating === stars ? 0 : stars)}
              className={`w-full flex items-center justify-between text-xs py-1 px-2 rounded-lg transition ${
                minRating === stars ? 'bg-amber-50 text-amber-900 font-bold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-gray-700 text-xs font-semibold mr-1">فأكثر</span>
              </div>
              {minRating === stars && <Check className="w-3.5 h-3.5 text-amber-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Checkbox toggles: Discount & Stock */}
      <div className="pt-4 space-y-2.5">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-800 select-none">
          <input
            type="checkbox"
            checked={onlyDiscount}
            onChange={(e) => onDiscountChange(e.target.checked)}
            className="w-4 h-4 rounded text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
          />
          <span>المنتجات المخفضة والعروض فقط</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-800 select-none">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => onStockChange(e.target.checked)}
            className="w-4 h-4 rounded text-brand-red focus:ring-brand-red accent-brand-red cursor-pointer"
          />
          <span>المنتجات المتوفرة في المخزن فقط</span>
        </label>
      </div>
    </div>
  );
};

