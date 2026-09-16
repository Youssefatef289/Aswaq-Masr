import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, Mail, MapPin, ShieldCheck, Truck, RotateCcw, 
  CreditCard, MessageCircle, Heart, ArrowUp, Facebook, Instagram 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const Footer = () => {
  const { categories, brands, settings } = useAdminData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWhatsApp = (settings?.whatsapp || '201012345678').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#171717] text-white pt-14 pb-24 md:pb-10 border-t-4 border-brand-red">
      {/* Trust Badges Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">توصيل حصري وفوري</h4>
              <p className="text-xs text-gray-400 mt-0.5">تغطية شاملة لجميع مراكز محافظة بني سويف</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">منتجات أصلية 100%</h4>
              <p className="text-xs text-gray-400 mt-0.5">ضمان جودة وصلاحية حديثة من كبرى الشركات</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">طلب مباشر وسريع</h4>
              <p className="text-xs text-gray-400 mt-0.5">إمكانية الطلب عبر الموقع أو الواتساب مباشرة</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">الدفع عند الاستلام</h4>
              <p className="text-xs text-gray-400 mt-0.5">افحص طلبك وادفع كاش عند باب البيت</p>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Brand & Contact Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center space-y-6">
        
        {/* 1. Centered Logo */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white stroke-none">
              <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
              <circle cx="12" cy="14" r="2.5"/>
            </svg>
          </div>
          <span className="text-3xl font-black text-white tracking-tight">
            أسواق <span className="text-brand-red">مصر</span>
          </span>
        </div>

        {/* 2. Slogan placed directly below the logo */}
        <p className="text-sm sm:text-base text-gray-300 font-medium max-w-xl mx-auto leading-relaxed">
          {settings?.tagline || 'كل احتياجات بيتك في بني سويف بأفضل سعر وأسرع توصيل'}
        </p>

        {/* 3. WhatsApp, Email, and Address neatly arranged below the slogan */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${cleanWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg transition transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>تواصل عبر الواتساب ({settings?.whatsapp || '01012345678'})</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${settings?.email || 'info@aswaqmasr.com'}`}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2.5 rounded-full text-xs font-bold transition border border-gray-700"
          >
            <Mail className="w-4 h-4 text-brand-red" />
            <span>{settings?.email || 'info@aswaqmasr.com'}</span>
          </a>

          {/* Hotline / Phone */}
          <a
            href={`tel:${settings?.phone || '19888'}`}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-5 py-2.5 rounded-full text-xs font-bold transition border border-gray-700"
          >
            <PhoneCall className="w-4 h-4 text-brand-red" />
            <span>الخط الساخن: {settings?.phone || '19888'}</span>
          </a>
        </div>

        {/* Address Badge */}
        <div className="inline-flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-xl text-xs text-gray-400 border border-gray-800">
          <MapPin className="w-4 h-4 text-brand-red shrink-0" />
          <span>{settings?.address || 'محافظة بني سويف - جمهورية مصر العربية'}</span>
        </div>

        {/* Navigation Quick Links Centered */}
        <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400 font-semibold">
          <Link to="/" className="hover:text-brand-red transition">الرئيسية</Link>
          <Link to="/categories" className="hover:text-brand-red transition">جميع الأقسام</Link>
          <Link to="/products" className="hover:text-brand-red transition">كل المنتجات</Link>
          <Link to="/offers" className="hover:text-brand-red transition">العروض والخصومات</Link>
          <Link to="/brands" className="hover:text-brand-red transition">الماركات</Link>
          <Link to="/track-order" className="hover:text-brand-red transition">تتبع طلبك</Link>
          <Link to="/admin" className="hover:text-amber-400 text-gray-500 transition">لوحة التحكم</Link>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-right">
          جميع الحقوق محفوظة © {new Date().getFullYear()} <span className="text-white font-bold">أسواق مصر</span> - بني سويف 🇪🇬
        </p>

        <div className="flex items-center gap-3">
          <span className="text-gray-400">وسائل الدفع:</span>
          <span className="bg-gray-800 text-gray-200 px-2.5 py-1 rounded text-[10px] font-bold">الدفع عند الاستلام كاش</span>
          <span className="bg-gray-800 text-gray-200 px-2.5 py-1 rounded text-[10px] font-bold">فودافون كاش</span>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-brand-red text-white flex items-center justify-center transition mr-2"
            title="الصعود للأعلى"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
