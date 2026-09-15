import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowLeft, Clock, Sparkles } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const FeaturedOffers = () => {
  const { offers } = useAdminData();

  return (
    <section className="py-8 sm:py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-brand-red font-bold text-xs sm:text-sm mb-1">
            <Sparkles className="w-4 h-4" />
            <span>صفقات لا تفوت</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            عروض مميزة وتخفيضات كبرى
          </h2>
        </div>

        <Link
          to="/offers"
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-darkRed transition"
        >
          <span>تصفح كل الصفقات</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {offers.slice(0, 4).map((offer) => (
          <div
            key={offer.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-brand-red shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            {/* Offer Banner Image */}
            <div className="relative aspect-[600/400] w-full overflow-hidden bg-gray-100">
              <img
                src={offer.bannerImage}
                alt={offer.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Tag / Badge */}
              <div className="absolute top-3 right-3 bg-brand-red text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                {offer.tag}
              </div>

              {/* Bottom text inside image */}
              <div className="absolute bottom-3 right-3 left-3 text-white">
                <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white font-semibold">
                  {offer.badge || 'عرض محدود'}
                </span>
                <h3 className="text-base font-black text-white mt-1 line-clamp-1 drop-shadow-sm">
                  {offer.title}
                </h3>
              </div>
            </div>

            {/* Offer Content */}
            <div className="p-4 flex flex-col justify-between flex-1 gap-3">
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-normal">
                {offer.subtitle}
              </p>

              <Link
                to={offer.link || '/offers'}
                className="w-full py-2.5 px-4 bg-brand-lightRed hover:bg-brand-red text-brand-red hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{offer.buttonText || 'تسوق العرض الآن'}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

