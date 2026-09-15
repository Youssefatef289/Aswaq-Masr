import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, Mail, MapPin, ShieldCheck, Truck, RotateCcw, 
  CreditCard, Send, Heart, Award, ArrowUp 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const Footer = () => {
  const { categories, brands, settings } = useAdminData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#171717] text-white pt-14 pb-20 md:pb-10 border-t-4 border-brand-red">
      {/* Trust Badges Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">توصيل سريع وموثوق</h4>
              <p className="text-xs text-gray-400 mt-0.5">شحن لجميع محافظات مصر حتى باب المنزل</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">منتجات أصلية 100%</h4>
              <p className="text-xs text-gray-400 mt-0.5">ضمان أصالة المصدر وتاريخ صلاحية حديث</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">إرجاع واستبدال سلس</h4>
              <p className="text-xs text-gray-400 mt-0.5">إمكانية الإرجاع خلال 14 يوم بكل سهولة</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">دفع آمن ومتعدد</h4>
              <p className="text-xs text-gray-400 mt-0.5">الدفع عند الاستلام، فيزا، ماستركارد، ومحافظ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About & Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white stroke-none">
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                أسواق <span className="text-brand-red">مصر</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed mb-6 max-w-sm">
              المنصة المصرية الرائدة للتسوق الإلكتروني وتوفير كافة احتياجات الأسرة والمنزل من السوبرماركت والأجهزة ومستحضرات العناية بأسعار تنافسية وجودة ممتازة.
            </p>

            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-brand-red shrink-0" />
                <span className="font-bold text-white">الخط الساخن: {settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 border-r-2 border-brand-red pr-2">
              أبرز الأقسام
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.id}`}
                    className="hover:text-brand-red transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-brand-red font-bold hover:underline block pt-1">
                  عرض كل الأقسام ←
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 border-r-2 border-brand-red pr-2">
              روابط سريعة
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link to="/offers" className="hover:text-brand-red transition-colors block py-0.5">
                  عروض وخصومات اليوم
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-brand-red transition-colors block py-0.5">
                  تصفح الماركات والبراندات
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-brand-red transition-colors block py-0.5">
                  تتبع مسار شحنتك
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-brand-red transition-colors block py-0.5">
                  سلة المشتريات
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-brand-red transition-colors block py-0.5">
                  قائمة الرغبات والمفضلة
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand-red transition-colors block py-0.5">
                  تسجيل الدخول / إنشاء حساب
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 border-r-2 border-brand-red pr-2">
              النشرة البريدية
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              اشترك الآن ليصلك أحدث العروض والصفقات الحصرية وكوبونات الخصم أولاً بأول.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('شكراً لاشتراكك في نشرة أسواق مصر الإخبارية!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-red"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-red hover:bg-brand-darkRed text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>اشترك في العروض</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-right">
          جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-white font-bold">أسواق مصر</span>. صُنع بكل فخر في مصر 🇪🇬
        </p>

        <div className="flex items-center gap-4">
          <span className="text-gray-400">وسائل الدفع المعتمدة:</span>
          <div className="flex items-center gap-2">
            <span className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-[10px] font-bold">كاش عند الاستلام</span>
            <span className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-[10px] font-bold">Visa / Master</span>
            <span className="bg-gray-800 text-gray-200 px-2 py-1 rounded text-[10px] font-bold">فودافون كاش</span>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-brand-red text-white flex items-center justify-center transition-colors mr-2"
            title="الصعود للأعلى"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

