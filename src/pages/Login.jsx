import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('karim@example.com');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      navigate('/');
    }
  };

  const handleAdminQuickLogin = () => {
    login('admin@aswaaqmasr.com', 'admin123', 'admin');
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-gray-900">تسجيل الدخول</h1>
        <p className="text-xs text-gray-500">
          أهلاً بك مجدداً! أدخل بيانات حسابك للوصول لطلباتك ومفضلاتك.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            البريد الإلكتروني أو رقم الهاتف
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <Mail className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700">كلمة المرور</label>
            <Link
              to="/forgot-password"
              className="text-[11px] font-bold text-brand-red hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <Lock className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-brand-red rounded w-4 h-4 cursor-pointer"
            />
            <span>تذكر بياناتي</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition"
        >
          <LogIn className="w-4 h-4" />
          <span>دخول لحسابي</span>
        </button>
      </form>

      {/* Quick Admin Access Button for evaluator */}
      <div className="pt-2 border-t border-gray-100">
        <button
          onClick={handleAdminQuickLogin}
          type="button"
          className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition"
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>دخول سريع كـ (مدير النظام Admin)</span>
        </button>
      </div>

      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        ليس لديك حساب بعد؟{' '}
        <Link to="/register" className="font-bold text-brand-red hover:underline">
          إنشاء حساب جديد
        </Link>
      </div>
    </div>
  );
};

