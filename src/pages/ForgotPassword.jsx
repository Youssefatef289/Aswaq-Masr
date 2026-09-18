import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSending(true);

    const res = await resetPassword(email);
    setIsSending(false);

    if (!res?.success) {
      setError(res?.error === 'Supabase غير مهيأ'
        ? 'لم يتم إعداد Supabase بعد — أضف مفاتيح المشروع في ملف .env'
        : (res?.error || 'تعذر إرسال رابط الاستعادة'));
      return;
    }
    setIsSent(true);
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black text-gray-900">استعادة كلمة المرور</h1>
        <p className="text-xs text-gray-500">
          أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
        </p>
      </div>

      {isSent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">تم إرسال الرابط بنجاح!</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            يرجى فحص صندوق الوارد أو البريد غير الهام (Spam) على <strong className="text-gray-800">{email}</strong>.
          </p>
          <Link
            to="/login"
            className="inline-block text-xs font-bold text-brand-red hover:underline pt-2"
          >
            العودة لصفحة تسجيل الدخول
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-brand-red text-xs font-bold rounded-xl text-center">
              {error}
            </div>
          )}

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

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 px-4 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md transition disabled:opacity-60"
          >
            <span>{isSending ? 'جاري الإرسال...' : 'إرسال رابط الاستعادة'}</span>
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-xs font-bold text-gray-500 hover:text-brand-red flex items-center justify-center gap-1"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>الرجوع لتسجيل الدخول</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

