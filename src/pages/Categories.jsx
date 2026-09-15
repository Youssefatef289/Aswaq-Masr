import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, ChevronRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useAdminData } from '../context/AdminDataContext';

export const Categories = () => {
  const { categories, products } = useAdminData();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'جميع الأقسام' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden border-b-4 border-brand-red shadow-lg">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>تسوق ذكي ومنظم</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">أقسام متجر أسواق مصر</h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            تصفح جميع أقسام المتجر واكتشف تشكيلة واسعة من المواد الغذائية، المنظفات، الألبان، ومستلزمات البيت بأعلى جودة وأفضل الأسعار.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const categoryProductsCount = products.filter((p) => p.categoryId === cat.id).length;
          const displayCount = categoryProductsCount > 0 ? categoryProductsCount : cat.productCount || 15;

          return (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group bg-white rounded-2xl border border-gray-200/80 hover:border-brand-red overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Image 300x300 */}
              <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute bottom-3 right-3 left-3 text-white">
                  <span className="text-[10px] font-bold bg-brand-red text-white px-2 py-0.5 rounded shadow-sm inline-block mb-1">
                    {displayCount} منتج متوفر
                  </span>
                  <h3 className="text-lg font-black text-white drop-shadow-sm group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Sub categories pills / link */}
              <div className="p-4 bg-white flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {cat.subCategories && cat.subCategories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                    {cat.subCategories.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                    {cat.subCategories.length > 3 && (
                      <span className="text-[10px] text-brand-red font-bold self-center">
                        +{cat.subCategories.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs font-bold text-brand-red group-hover:text-brand-darkRed">
                  <span>تصفح منتجات القسم</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

