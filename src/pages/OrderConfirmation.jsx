import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, Truck, Package, Calendar, MapPin, 
  Phone, ArrowLeft, Home, ShoppingBag 
} from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import confetti from 'canvas-confetti';
import { formatPrice, formatDate } from '../utils/formatters';

export const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useAdminData();
  const order = location.state?.order;
  const canUseWhatsApp = order?.governorate && (settings?.whatsappGovernorates || []).includes(order.governorate);
  const whatsappMessage = order
    ? `تأكيد الطلب ${order.orderNumber || order.id} باسم ${order.customerName} بإجمالي ${formatPrice(order.total)}`
    : '';

  useEffect(() => {
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">لم يتم العثور على تفاصيل الطلب</h2>
        <Link to="/" className="text-brand-red font-bold underline mt-2 block">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      {/* Success Card */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm text-center space-y-6">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            تم تسجيل الطلب بنجاح ✓
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            شكراً لطلبك من أسواق مصر!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            تم استلام طلبك بنجاح وجاري الآن مراجعته وتجهيزه للشحن السريع حتى باب منزلك.
          </p>
        </div>

        {/* Order Details Grid */}
        <div className="bg-gray-50 rounded-2xl p-5 sm:p-6 text-right space-y-4 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-200 text-xs">
            <div>
              <span className="text-gray-500 block mb-0.5">رقم الطلب (Order ID):</span>
              <span className="text-sm font-black text-brand-red font-mono">{order.orderNumber || order.id}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">اسم العميل:</span>
              <span className="text-sm font-bold text-gray-900">{order.customerName}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">رقم الهاتف للتواصل:</span>
              <span className="text-xs font-bold text-gray-900 font-mono">{order.phone}</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-0.5">طريقة الدفع:</span>
              <span className="text-xs font-bold text-gray-900">{order.paymentMethod}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-gray-500 block mb-0.5">عنوان التوصيل:</span>
              <span className="text-xs font-semibold text-gray-800">
                {order.governorate}، {order.city} - {order.address}
              </span>
            </div>
          </div>

          {/* Delivery Estimation */}
          <div className="flex items-center gap-3 bg-red-50/70 p-3.5 rounded-xl text-xs text-brand-darkRed font-semibold border border-brand-red/20">
            <Truck className="w-5 h-5 text-brand-red shrink-0" />
            <div>
              <span>الموعد المتوقع للتوصيل: </span>
              <strong className="text-gray-900">خلال 24 إلى 48 ساعة كحد أقصى</strong>
            </div>
          </div>

          {/* Items Summary */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-gray-700 mb-2">الأصناف المطلوبة:</h3>
            <div className="space-y-2">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1">
                  <span className="text-gray-700">{item.name} × {item.quantity}</span>
                  <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-gray-200 flex items-center justify-between text-sm">
              <span className="font-bold text-gray-900">المجموع الكلي:</span>
              <span className="text-base font-black text-brand-red font-mono">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to={`/track-order?id=${order.id}`}
            className="w-full sm:w-auto px-6 py-3 bg-brand-red hover:bg-brand-darkRed text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition"
          >
            <Truck className="w-4 h-4" />
            <span>متابعة وتتبع الطلب (Track Order)</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
          {canUseWhatsApp && (
            <a
              href={`https://wa.me/${(settings.whatsapp || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>تأكيد الطلب عبر واتساب</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

