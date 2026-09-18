import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isSupabaseConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res?.success) {
      if (res.user?.role === 'admin' || res.user?.role === 'manager') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else if (res?.error) {
      setError(typeof res.error === 'string' ? res.error : 'تعذر تسجيل الدخول');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-gray-900">تسجيل الدخول</h1>
        <p className="text-xs text-gray-500">
          أهلاً بك في أسواق مصر! أدخل بيانات حسابك للمتابعة.
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 font-bold">
          لم يتم إعداد Supabase بعد. أضف VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-brand-red text-xs font-bold rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            البريد الإلكتروني
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
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
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition disabled:opacity-60"
        >
          <LogIn className="w-4 h-4" />
          <span>{isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</span>
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
