import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowLeft } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const BrandsSlider = () => {
  const { brands } = useAdminData();

  return (
    <section className="py-8 sm:py-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-brand-red font-bold text-xs sm:text-sm mb-1">
            <Award className="w-4 h-4" />
            <span>شركاء النجاح والجودة</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            تسوق حسب البراند المفضل لديك
          </h2>
        </div>

        <Link
          to="/brands"
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-darkRed transition"
        >
          <span>كل الماركات</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/brand/${brand.id}`}
            className="group bg-white p-4 rounded-2xl border border-gray-200/80 hover:border-brand-red hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center justify-between"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-3 group-hover:scale-105 transition-transform duration-300">
              <img
                src={brand.logo}
                alt={brand.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-red transition-colors">
                {brand.name}
              </h3>
              <span className="text-[10px] text-gray-400 mt-0.5 block">
                {brand.productCount || 10}+ منتج
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

