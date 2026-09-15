import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Flame, Sparkles, Clock, ArrowLeft, Percent, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { useAdminData } from '../context/AdminDataContext';

export const Offers = () => {
  const { offers, products } = useAdminData();

  // Filter products that have discounts
  const discountedProducts = products.filter(
    (p) => p.discount > 0 || (p.oldPrice && p.oldPrice > p.price)
  );

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'عروض وتخفيضات اليوم' }]} />

      {/* Main Header Banner 1200x400 */}
      <div className="relative rounded-3xl overflow-hidden red-gradient text-white p-6 sm:p-12 shadow-xl aspect-[1200/400] min-h-[220px] max-h-[380px] flex items-center">
        <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 bg-white text-brand-red font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-md animate-pulse">
            <Flame className="w-4 h-4 fill-brand-red" />
            <span>مهرجان عروض وتخفيضات أسواق مصر</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            خصومات تصل إلى <span className="text-amber-300">40%</span> على مئات المنتجات!
          </h1>

          <p className="text-xs sm:text-base text-red-100 max-w-xl leading-relaxed font-normal">
            وفّر ميزانيتك اليوم مع أقوى الصفقات الحصرية على الأغذية، المنظفات، والأجهزة المنزلية مع هدايا وكوبونات مجانية.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="absolute left-6 bottom-6 hidden md:flex flex-col items-center justify-center w-36 h-36 rounded-full bg-amber-400 text-gray-900 shadow-2xl transform rotate-12 border-4 border-white">
          <Percent className="w-8 h-8 font-black" />
          <span className="text-xs font-black uppercase">عروض يومية</span>
          <span className="text-sm font-black">وفر أكثر</span>
        </div>
      </div>

      {/* Offer Banners Grid 1200x400 style */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-brand-red" />
          <h2 className="text-xl font-black text-gray-900">بانرات الصفقات الكبرى</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-brand-red shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[600/400] w-full overflow-hidden bg-gray-100">
                <img
                  src={offer.bannerImage}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-3 right-3 bg-brand-red text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                  {offer.tag}
                </div>

                <div className="absolute bottom-3 right-3 left-3 text-white">
                  <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white font-semibold">
                    {offer.badge || 'عرض محدود'}
                  </span>
                  <h3 className="text-sm font-black text-white mt-1 line-clamp-1">
                    {offer.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {offer.subtitle}
                </p>

                <Link
                  to={offer.link || '/products'}
                  className="w-full py-2.5 px-4 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>{offer.buttonText || 'تسوق العرض الآن'}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discounted Products Grid */}
      <section className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-brand-red font-bold text-xs mb-0.5">
              <Sparkles className="w-4 h-4" />
              <span>أحدث الخصومات الفعالة</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              جميع المنتجات المخفضة ({discountedProducts.length})
            </h2>
          </div>
        </div>

        <ProductGrid
          products={discountedProducts}
          columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        />
      </section>
    </div>
  );
};

