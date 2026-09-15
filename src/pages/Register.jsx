import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, UserPlus, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { egyptianGovernorates } from '../data/governorates';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    governorate: 'cairo',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      governorate: formData.governorate,
      city: formData.city
    });

    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-gray-900">إنشاء حساب جديد</h1>
        <p className="text-xs text-gray-500">
          انضم لعائلة أسواق مصر وتمتع بأقوى العروض ونقاط المكافآت والتوصيل السريع!
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-brand-red text-xs font-bold rounded-xl text-center">
          {error}
        </div>
      )}

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
              placeholder="المعادي"
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
          className="w-full py-3 px-4 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition mt-4"
        >
          <UserPlus className="w-4 h-4" />
          <span>إنشاء الحساب والتسجيل</span>
        </button>
      </form>

      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        لديك حساب بالفعل؟{' '}
        <Link to="/login" className="font-bold text-brand-red hover:underline">
          تسجيل الدخول
        </Link>
      </div>
    </div>
  );
};

