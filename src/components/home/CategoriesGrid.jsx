import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const CategoriesGrid = () => {
  const { categories } = useAdminData();

  return (
    <section className="py-8 sm:py-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 text-brand-red font-bold text-xs sm:text-sm mb-1">
            <Layers className="w-4 h-4" />
            <span>تنوع يناسب بيتك</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            تسوق حسب القسم
          </h2>
        </div>

        <Link
          to="/categories"
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-darkRed transition"
        >
          <span>عرض كل الأقسام</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.slice(0, 8).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group flex flex-col items-center bg-white p-3.5 rounded-2xl border border-gray-200/80 hover:border-brand-red hover:shadow-card-hover transition-all duration-300 text-center"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 bg-red-50/50 p-1 border-2 border-transparent group-hover:border-brand-red transition-all">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-red line-clamp-1 transition-colors">
              {category.name}
            </h3>
            <span className="text-[11px] text-gray-400 mt-0.5">
              {category.productCount || 20}+ منتج
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

