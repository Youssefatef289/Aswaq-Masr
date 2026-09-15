import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center font-black shadow-md">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
              <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
            </svg>
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            أسواق <span className="text-brand-red">مصر</span>
          </span>
        </Link>

        <Link
          to="/"
          className="text-xs font-bold text-gray-600 hover:text-brand-red flex items-center gap-1 transition"
        >
          <span>الرجوع للرئيسية</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Auth Card Container */}
      <div className="my-auto py-8">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto w-full text-center text-xs text-gray-500 py-4 border-t border-gray-200">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} أسواق مصر للتجارة الإلكترونية</p>
      </div>
    </div>
  );
};

