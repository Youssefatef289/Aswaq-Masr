import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Percent, ArrowLeft, ShieldCheck, Flame } from 'lucide-react';

export const PromotionalBanner = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="relative rounded-3xl overflow-hidden red-gradient text-white p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Background decorative circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>توفير حقيقي لأهل مصر</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
              املأ بيتك ووفر فلوسك مع <br />
              <span className="text-amber-300 underline decoration-white/40">أسواق مصر</span>
            </h2>

            <p className="text-xs sm:text-base text-red-100 max-w-lg leading-relaxed font-normal">
              استمتع بكوبون خصم إضافي <span className="font-bold text-white bg-black/30 px-2 py-0.5 rounded">ASWAAQ10</span> بخصم 10% على كل طلباتك عند الدفع، بالإضافة لشحن مجاني للطلبات فوق 1000 ج.م!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="bg-white text-brand-red hover:bg-gray-100 px-6 sm:px-8 py-3.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4 text-brand-red" />
                <span>ابدأ التسوق الآن</span>
              </Link>
              <Link
                to="/offers"
                className="bg-black/20 hover:bg-black/40 border border-white/30 text-white px-5 sm:px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm backdrop-blur-md transition flex items-center gap-1.5"
              >
                <span>صفحة العروض</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-bold text-white">كوبون اليوم</span>
                <span className="bg-amber-400 text-black text-[11px] font-black px-2 py-0.5 rounded">
                  متاح للجميع
                </span>
              </div>
              <div className="text-center py-2 bg-white rounded-xl text-black shadow-inner">
                <span className="text-xs text-gray-500 font-bold block">كود الخصم الفوري:</span>
                <span className="text-xl sm:text-2xl font-black tracking-widest text-brand-red font-mono">
                  ASWAAQ10
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-red-100">
                <span>✓ خصم 10% فوري</span>
                <span>✓ ساري على جميع الأقسام</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

