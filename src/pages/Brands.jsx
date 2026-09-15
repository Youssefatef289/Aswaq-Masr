import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useAdminData } from '../context/AdminDataContext';

export const Brands = () => {
  const { brands, products } = useAdminData();

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'البراندات والماركات' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden border-b-4 border-brand-red shadow-lg">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>ماركات أصلية وموثوقة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2">تسوق حسب أشهر البراندات</h1>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            نحن نوفر لك أفضل العلامات التجارية المصرية والعالمية المعتمدة لضمان أعلى معايير الجودة لبيتك وعائلتك.
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {brands.map((brand) => {
          const brandProductsCount = products.filter((p) => p.brandId === brand.id).length;
          const displayCount = brandProductsCount > 0 ? brandProductsCount : brand.productCount || 12;

          return (
            <Link
              key={brand.id}
              to={`/brand/${brand.id}`}
              className="group bg-white p-5 rounded-2xl border border-gray-200/80 hover:border-brand-red hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center justify-between"
            >
              {/* Logo 200x200 */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-50 flex items-center justify-center p-3 mb-4 group-hover:scale-105 transition-transform duration-300 border border-gray-100">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                />
              </div>

              <div>
                <h3 className="text-sm font-black text-gray-800 group-hover:text-brand-red transition-colors">
                  {brand.name}
                </h3>
                <span className="text-[11px] text-gray-400 font-semibold mt-1 block">
                  {displayCount} منتج متوفر
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 w-full flex items-center justify-center gap-1 text-[11px] font-bold text-brand-red group-hover:text-brand-darkRed">
                <span>عرض المنتجات</span>
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

