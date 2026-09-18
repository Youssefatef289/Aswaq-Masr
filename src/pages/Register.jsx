import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, UserPlus, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { egyptianGovernorates } from '../data/governorates';

export const Register = () => {
  const navigate = useNavigate();
  const { register, isSupabaseConfigured } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    governorate: 'beni-suef',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiresEmailConfirmation, setRequiresEmailConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      governorate: formData.governorate,
      city: formData.city,
      password: formData.password
    });
    setIsSubmitting(false);

    if (!res?.success) {
      setError(typeof res?.error === 'string' ? res.error : 'تعذر إنشاء الحساب');
      return;
    }

    if (res.requiresEmailConfirmation) {
      setRequiresEmailConfirmation(true);
      return;
    }
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-gray-900">إنشاء حساب جديد</h1>
        <p className="text-xs text-gray-500">
          انضم لعائلة أسواق مصر وتمتع بأقوى العروض والتوصيل السريع!
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

      {requiresEmailConfirmation && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
          <div className="w-14 h-14 bg-green-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-black text-gray-900">تم إنشاء الحساب بنجاح!</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            أرسلنا لك رابط تأكيد على بريدك الإلكتروني <strong>{formData.email}</strong>.
            يرجى تأكيد البريد ثم تسجيل الدخول.
          </p>
          <Link
            to="/login"
            className="inline-block text-xs font-bold text-brand-red hover:underline"
          >
            الانتقال لتسجيل الدخول
          </Link>
        </div>
      )}

      {!requiresEmailConfirmation && (
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">الاسم بالكامل</label>
          <div className="relative">
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="مثال: يوسف أحمد"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
          <div className="relative">
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <Mail className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">رقم الهاتف</label>
          <div className="relative">
            <input
              type="tel"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01012345678"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <Phone className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">المحافظة</label>
            <select
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white cursor-pointer"
            >
              {egyptianGovernorates.map((gov) => (
                <option key={gov.id} value={gov.id}>{gov.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">المدينة / الحي</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="بني سويف الجديدة"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
            <span className="text-[10px] text-gray-400 block mt-0.5">8 أحرف على الأقل</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">تأكيد كلمة المرور</label>
            <input
              type="password"
              required
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition mt-4 disabled:opacity-60"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب والتسجيل'}</span>
        </button>
      </form>
      )}

      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        لديك حساب بالفعل؟{' '}
        <Link to="/login" className="font-bold text-brand-red hover:underline">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
};