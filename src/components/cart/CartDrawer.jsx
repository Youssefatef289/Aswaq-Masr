import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ArrowLeft, 
  CheckCircle2, ShieldCheck, Truck, MessageCircle, 
  MapPin, Phone, User, Tag, ChevronRight, Lock, Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAdminData } from '../../context/AdminDataContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { beniSuefDistricts } from '../../data/governorates';
import { formatPrice } from '../../utils/formatters';

export const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  const { createOrder, settings } = useAdminData();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    coupon,
    applyCoupon,
    removeCoupon,
    shippingCost,
    setShippingCost,
    grandTotal,
    totalItemsCount
  } = useCart();

  const [currentStep, setCurrentStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [createdOrderData, setCreatedOrderData] = useState(null);
  const [couponInput, setCouponInput] = useState('');

  // In-drawer Checkout Form
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    district: beniSuefDistricts[0]?.id || 'beni-suef-city',
    address: user?.address || '',
    notes: '',
    paymentMethod: 'cod' // 'cod' | 'whatsapp'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleDistrictChange = (districtId) => {
    const dist = beniSuefDistricts.find((d) => d.id === districtId);
    setFormData((prev) => ({ ...prev, district: districtId }));
    if (dist) {
      setShippingCost(dist.shippingCost);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  // Submit Order inside Drawer
  const handleSubmitOrder = (e) => {
    e?.preventDefault();

    if (cartItems.length === 0) {
      addToast('سلة المشتريات فارغة!', 'error');
      return;
    }

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      addToast('يرجى ملء جميع الحقول المطلوبة (الاسم، الهاتف، العنوان)', 'error');
      return;
    }

    setIsSubmitting(true);

    const selectedDist = beniSuefDistricts.find((d) => d.id === formData.district);
    const districtName = selectedDist?.name || formData.district;

    const newOrder = createOrder({
      customerName: formData.fullName,
      phone: formData.phone,
      governorate: 'بني سويف',
      city: districtName,
      address: formData.address,
      notes: formData.notes,
      paymentMethod: formData.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'طلب مباشر عبر الواتساب',
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

    setCreatedOrderData(newOrder);
    clearCart();
    setIsSubmitting(false);
    setCurrentStep('success');
  };

  // Send Direct Order to WhatsApp
  const handleWhatsAppOrder = () => {
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      addToast('يرجى ملء الاسم والهاتف والعنوان أولاً قبل فتح الواتساب', 'error');
      return;
    }

    const selectedDist = beniSuefDistricts.find((d) => d.id === formData.district);
    const districtName = selectedDist?.name || formData.district;
    const whatsappNum = settings?.whatsapp?.replace(/[^0-9]/g, '') || '201012345678';

    const itemsText = cartItems
      .map((item, idx) => `${idx + 1}. *${item.name}* (العدد: ${item.quantity}) - ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const message = `🛍️ *طلب جديد من متجر أسواق مصر (نطاق بني سويف)* 🇪🇬
━━━━━━━━━━━━━━━━━━
👤 *اسم العميل:* ${formData.fullName}
📞 *رقم الهاتف:* ${formData.phone}
📍 *المنطقة/المركز:* ${districtName}
🏠 *العنوان بالتفصيل:* ${formData.address}
${formData.notes ? `📝 *ملاحظات:* ${formData.notes}\n` : ''}
📦 *المنتجات المطلوبة:*
${itemsText}

━━━━━━━━━━━━━━━━━━
💵 *المجموع الفرعي:* ${formatPrice(subtotal)}
🚚 *خدمة التوصيل:* ${shippingCost === 0 ? 'مجاناً' : formatPrice(shippingCost)}
💰 *الإجمالي المستحق:* ${formatPrice(grandTotal)}
━━━━━━━━━━━━━━━━━━
برجاء تأكيد استلام الطلب وتحديد موعد التوصيل. شكراً لكم!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedMessage}`;

    // Also register order in the system
    handleSubmitOrder();

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-left duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-lightRed text-brand-red rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-gray-900">
                  {currentStep === 'cart' && `سلة التسوق (${totalItemsCount} قطع)`}
                  {currentStep === 'checkout' && 'إتمام الطلب السريع'}
                  {currentStep === 'success' && 'تم استلام طلبك!'}
                </h2>
                <span className="text-[11px] text-emerald-600 font-bold block -mt-0.5">
                  توصيل فوري لجميع مراكز بني سويف 🚚
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            
            {/* STEP 1: Cart View */}
            {currentStep === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">سلتك فارغة حالياً</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      تصفح عروض أسواق مصر وأضف منتجاتك المفضلة إلى السلة.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-2 text-xs font-bold text-brand-red hover:underline"
                    >
                      تصفح المنتجات الآن ←
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-3 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-contain bg-gray-50 p-1.5 border border-gray-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-xs font-black text-brand-red block mt-0.5">
                            {formatPrice(item.price)}
                          </span>

                          {/* Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 rounded bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center text-xs font-bold"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 rounded bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center text-xs font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1 transition"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-left shrink-0">
                          <span className="text-xs font-black text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Coupon Box inside drawer */}
                {cartItems.length > 0 && (
                  <div className="pt-3 border-t border-gray-100">
                    {coupon ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2 rounded-xl text-xs">
                        <span className="font-bold text-green-800">كوبون فعال: {coupon.code}</span>
                        <button onClick={removeCoupon} className="text-red-600 font-bold">إلغاء</button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="كود الخصم (ASWAAQ10)"
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs uppercase font-mono focus:outline-none focus:border-brand-red"
                        />
                        <button
                          type="submit"
                          className="bg-gray-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                        >
                          تطبيق
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: In-Drawer Checkout Form */}
            {currentStep === 'checkout' && (
              <form id="drawer-checkout-form" onSubmit={handleSubmitOrder} className="space-y-3.5 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrentStep('cart')}
                  className="text-xs text-brand-red font-bold flex items-center gap-1 hover:underline mb-2"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>الرجوع لمحتويات السلة</span>
                </button>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">الاسم بالكامل *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="مثال: أحمد محمد"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">رقم الهاتف للتواصل *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="01012345678"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">المركز / المنطقة في بني سويف *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red cursor-pointer"
                  >
                    {beniSuefDistricts.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {dist.name} (توصيل: {dist.shippingCost} ج.م)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">العنوان بالتفصيل *</label>
                  <textarea
                    required
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="الشارع، رقم العمارة، الشقة أو علامة مميزة..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">ملاحظات إضافية (اختياري)</label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="أي تعليمات خاصة للمندوب"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="p-3 bg-red-50/60 rounded-xl border border-brand-red/20 text-[11px] text-brand-darkRed">
                  📍 التوصيل متاح وحصري لجميع مراكز ومناطق محافظة بني سويف مع الدفع عند الاستلام.
                </div>
              </form>
            )}

            {/* STEP 3: Order Success in Drawer */}
            {currentStep === 'success' && createdOrderData && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    تم استلام طلبك بنجاح ✓
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mt-2">
                    شكراً لطلبك من أسواق مصر!
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    رقم الطلب: <strong className="text-brand-red font-mono">{createdOrderData.id}</strong>
                  </p>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-xl text-right text-xs space-y-1.5 border border-gray-100">
                  <p><strong>المستلم:</strong> {createdOrderData.customerName}</p>
                  <p><strong>المنطقة:</strong> {createdOrderData.city} - {createdOrderData.address}</p>
                  <p><strong>المبلغ المطلوب:</strong> <strong className="text-brand-red font-mono">{formatPrice(createdOrderData.total)}</strong></p>
                  <p className="text-emerald-700 font-bold">الموعد المتوقع: خلال ساعات اليوم 🚚</p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/track-order?id=${createdOrderData.id}`);
                    }}
                    className="w-full py-2.5 bg-brand-red text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    تتبع حالة الطلب
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
                  >
                    متابعة التسوق
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Actions */}
          {cartItems.length > 0 && currentStep !== 'success' && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/80 space-y-3">
              {/* Financial Calculation */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>الخصم:</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>الشحن (بني سويف):</span>
                  <span className="font-bold text-gray-900">
                    {shippingCost === 0 ? 'مجاناً 🎉' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>الإجمالي الكلي:</span>
                  <span className="text-lg font-black text-brand-red">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Action Buttons based on step */}
              {currentStep === 'cart' ? (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => setCurrentStep('checkout')}
                    className="w-full py-3.5 bg-brand-red hover:bg-brand-darkRed text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition transform active:scale-98"
                  >
                    <span>متابعة إتمام الطلب</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep('checkout');
                      setFormData((prev) => ({ ...prev, paymentMethod: 'whatsapp' }));
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>الطلب السريع عبر الواتساب</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  {/* WhatsApp Order Button */}
                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition transform active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>تأكيد والطلب عبر الواتساب (WhatsApp)</span>
                  </button>

                  {/* Standard Submit Button */}
                  <button
                    type="submit"
                    form="drawer-checkout-form"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-brand-red hover:bg-brand-darkRed text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isSubmitting ? 'جاري التأكيد...' : 'تأكيد الطلب (الدفع عند الاستلام)'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
