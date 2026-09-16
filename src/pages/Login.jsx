import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldCheck, Check, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usernameOrEmail && password) {
      const res = login(usernameOrEmail, password);
      if (res?.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  const handleFillAdminCredentials = () => {
    setUsernameOrEmail('admin@aswaqmasr.com');
    setPassword('Admin@AswaqMasr2026');
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-gray-900">تسجيل الدخول</h1>
        <p className="text-xs text-gray-500">
          أهلاً بك في أسواق مصر! أدخل بيانات حسابك للمتابعة.
        </p>
      </div>

      {/* Admin Credentials Info Card */}
      <div className="p-3.5 bg-red-50/70 border border-brand-red/20 rounded-2xl text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-brand-darkRed flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-red" />
            <span>بيانات دخول مسؤول لوحة التحكم (Admin):</span>
          </span>
          <button
            type="button"
            onClick={handleFillAdminCredentials}
            className="text-[11px] bg-brand-red text-white px-2.5 py-0.5 rounded-lg font-bold hover:bg-brand-darkRed transition"
          >
            تعبئة تلقائية
          </button>
        </div>
        <div className="text-[11px] text-gray-600 font-mono space-y-0.5">
          <p><strong>Username:</strong> admin@aswaqmasr.com (أو admin)</p>
          <p><strong>Password:</strong> Admin@AswaqMasr2026</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            اسم المستخدم أو البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="admin@aswaqmasr.com أو اسم المستخدم"
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
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white font-mono"
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
            <span>تذكر بيانات الدخول</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition"
        >
          <LogIn className="w-4 h-4" />
          <span>تسجيل الدخول</span>
        </button>
      </form>

      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        ليس لديك حساب بعد؟{' '}
        <Link to="/register" className="font-bold text-brand-red hover:underline">
          إنشاء حساب جديد
        </Link>
      </div>
    </div>
  );
};
