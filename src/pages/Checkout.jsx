import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, Truck, CreditCard, Banknote, 
  MapPin, Phone, User, FileText, CheckCircle2, 
  AlertCircle, Lock, ArrowLeft 
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';
import { useToast } from '../context/ToastContext';
import { egyptianGovernorates } from '../data/governorates';
import { formatPrice } from '../utils/formatters';

export const Checkout = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  const { createOrder } = useAdminData();
  const {
    cartItems,
    subtotal,
    discount,
    coupon,
    shippingCost,
    setShippingCost,
    setShippingGovernorate,
    grandTotal,
    clearCart
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    alternatePhone: '',
    governorate: user?.governorate || 'cairo',
    city: user?.city || 'القاهرة',
    address: user?.address || '',
    notes: '',
    paymentMethod: 'cod' // 'cod' | 'card' | 'wallet'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // When user selects a governorate, update shipping cost
  const handleGovernorateChange = (govId) => {
    const selectedGov = egyptianGovernorates.find((g) => g.id === govId);
    setFormData((prev) => ({ ...prev, governorate: govId }));
    setShippingGovernorate(govId);
    if (selectedGov) {
      setShippingCost(selectedGov.shippingCost);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      addToast('سلة المشتريات فارغة!', 'error');
      navigate('/cart');
      return;
    }

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      addToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    setIsSubmitting(true);

    const selectedGov = egyptianGovernorates.find((g) => g.id === formData.governorate);
    const govName = selectedGov?.name || formData.governorate;

    const newOrder = createOrder({
      customerName: formData.fullName,
      phone: formData.phone,
      alternatePhone: formData.alternatePhone,
      governorate: govName,
      city: formData.city,
      address: formData.address,
      notes: formData.notes,
      paymentMethod:
        formData.paymentMethod === 'cod'
          ? 'الدفع عند الاستلام'
          : formData.paymentMethod === 'card'
          ? 'بطاقة بنكية'
          : 'محفظة إلكترونية (فودافون كاش)',
      subtotal,
      discount,
      shippingCost,
      total: grandTotal,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }))
    });

    // Clear cart and go to confirmation
    clearCart();
    setIsSubmitting(false);
    navigate('/order-success', { state: { order: newOrder } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-800">سلة التسوق فارغة</h2>
        <Link to="/products" className="text-brand-red font-bold underline mt-2 block">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'سلة المشتريات', to: '/cart' },
          { label: 'إتمام الطلب والدفع' }
        ]}
      />

      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-red" />
          <span>إتمام الطلب والشحن الآمن</span>
        </h1>
        <span className="text-xs text-gray-500 hidden sm:block">
          جميع بياناتك مشفرة ومحمية 100%
        </span>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Checkout Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Customer & Shipping Info */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <MapPin className="w-5 h-5 text-brand-red" />
              <span>بيانات التوصيل والعنوان</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  الاسم بالكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="مثال: أحمد محمد علي"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  رقم الهاتف الأساسي <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="01012345678"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              {/* Alternate Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  رقم هاتف إضافي (اختياري)
                </label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleInputChange}
                  placeholder="01123456789"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              {/* Governorate */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  المحافظة <span className="text-red-500">*</span>
                </label>
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={(e) => handleGovernorateChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white cursor-pointer"
                >
                  {egyptianGovernorates.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {gov.name} (الشحن: {gov.shippingCost} ج.م - {gov.estimatedDays})
                    </option>
                  ))}
                </select>
              </div>

              {/* City / Area */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  المدينة / الحي <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="مثال: المعادي، الدقي، سموحة..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              {/* Detailed Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  العنوان بالتفصيل (اسم الشارع، رقم العمارة، رقم الشقة أو علامة مميزة) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="شارع 9، عمارة 12، الدور الرابع، بجوار مسجد..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>

              {/* Order Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ملاحظات إضافية للتوصيل (اختياري)
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="أي تعليمات خاصة لمندوب الشحن"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-brand-red focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Section */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Banknote className="w-5 h-5 text-brand-red" />
              <span>طريقة الدفع</span>
            </h2>

            <div className="space-y-3">
              {/* COD Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'cod'
                    ? 'border-brand-red bg-red-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="mt-1 accent-brand-red cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      الدفع نقداً عند الاستلام (Cash On Delivery)
                    </span>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      الأكثر تفضيلاً
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    ادفع نقداً لمندوب الشحن عند استلام الطلب وفحصه أمام باب بيتك.
                  </p>
                </div>
              </label>

              {/* Online Card */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'card'
                    ? 'border-brand-red bg-red-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="mt-1 accent-brand-red cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      البطاقات البنكية (Visa / MasterCard / ميزة)
                    </span>
                    <CreditCard className="w-4 h-4 text-gray-500" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    دفع آمن ومحمي بأعلى معايير الأمان 3D Secure.
                  </p>
                </div>
              </label>

              {/* Mobile Wallet */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'wallet'
                    ? 'border-brand-red bg-red-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={formData.paymentMethod === 'wallet'}
                  onChange={handleInputChange}
                  className="mt-1 accent-brand-red cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      محافظ الموبايل (فودافون كاش، اتصالات كاش، أورنج، وي باي)
                    </span>
                    <span className="text-[11px] font-bold text-brand-red">كاش</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    تحويل مباشر وسهل عبر رقم محفظتك الإلكترونية.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary & Confirm (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5 sticky top-24">
            <h2 className="text-base font-black text-gray-900 pb-3 border-b border-gray-100">
              محتويات طلبك ({cartItems.length} أصناف)
            </h2>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-gray-800 truncate">{item.name}</p>
                      <span className="text-[11px] text-gray-400">الكمية: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-black text-gray-900 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs pt-4 border-t border-gray-100 text-gray-600">
              <div className="flex items-center justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>خصم الكوبون ({coupon?.code}):</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>تكلفة الشحن:</span>
                <span className="font-bold text-gray-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-black">مجاناً 🎉</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-sm">
                <span className="font-black text-gray-900">الإجمالي النهائي المستحق:</span>
                <span className="text-xl font-black text-brand-red">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-black text-sm bg-brand-red hover:bg-brand-darkRed text-white flex items-center justify-center gap-2 shadow-xl shadow-red-500/25 transition-all transform active:scale-98 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isSubmitting ? 'جاري تأكيد الطلب...' : 'تأكيد وإتمام الطلب الآن'}</span>
            </button>

            <p className="text-[11px] text-center text-gray-400 leading-relaxed">
              بالضغط على تأكيد الطلب، فإنك توافق على شروط وسياسة الاستخدام في أسواق مصر.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

