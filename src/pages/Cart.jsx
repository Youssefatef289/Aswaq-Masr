import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, Plus, Minus, ArrowLeft, ShoppingBag, 
  Tag, ShieldCheck, Truck, ChevronRight 
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

export const Cart = () => {
  const navigate = useNavigate();
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
    grandTotal
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput.trim());
      setCouponCodeInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'سلة المشتريات' }]} />

        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-xl mx-auto space-y-4 my-8 shadow-sm">
          <div className="w-20 h-20 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black text-gray-900">سلة التسوق فارغة حالياً</h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            لم تقم بإضافة أي منتجات إلى سلتك بعد. استكشف أقوى العروض والتخفيضات اليومية في أسواق مصر.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-darkRed text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
            >
              <span>ابدأ التسوق الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'سلة المشتريات' }]} />

      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900">
          سلة المشتريات ({cartItems.length} منتجات)
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>تفريغ السلة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Cart Items Table / List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-sm">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition"
            >
              {/* Product Info with 100x100 Image */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-contain bg-gray-50 p-2 border border-gray-100 hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  {item.brandName && (
                    <span className="text-[11px] font-bold text-gray-400 block mb-0.5">
                      {item.brandName}
                    </span>
                  )}
                  <Link
                    to={`/product/${item.id}`}
                    className="text-xs sm:text-sm font-bold text-gray-800 hover:text-brand-red line-clamp-2 leading-snug transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-brand-red">
                      {formatPrice(item.price)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through">
                        {formatPrice(item.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Selector & Item Total */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold transition"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-black text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white text-gray-700 hover:bg-gray-100 flex items-center justify-center font-bold transition"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Subtotal for Item */}
                <div className="text-left min-w-[80px]">
                  <span className="text-xs sm:text-sm font-black text-gray-900 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition"
                  title="حذف من السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="p-4 bg-gray-50/50 flex items-center justify-between">
            <Link
              to="/products"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>متابعة التسوق وإضافة منتجات أخرى</span>
            </Link>
          </div>
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5">
            <h2 className="text-base font-black text-gray-900 pb-3 border-b border-gray-100">
              ملخص الطلب (Order Summary)
            </h2>

            {/* Coupon Code Section */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-brand-red" />
                <span>كوبون الخصم:</span>
              </span>

              {coupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2.5 rounded-xl text-xs">
                  <div>
                    <span className="font-bold text-green-800 font-mono block">{coupon.code}</span>
                    <span className="text-[11px] text-green-600 font-medium">{coupon.label}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="جرب ASWAAQ10 أو MASR50"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-brand-red"
                  />
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    تطبيق
                  </button>
                </form>
              )}
            </div>

            {/* Financial Calculations */}
            <div className="space-y-2.5 text-xs pt-3 border-t border-gray-100 text-gray-600">
              <div className="flex items-center justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>قيمة الخصم والكوبون:</span>
                  <span>- {formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>مصاريف الشحن والتوصيل:</span>
                <span className="font-bold text-gray-900">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-black">مجاناً 🎉</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              {subtotal < 1000 && (
                <p className="text-[11px] text-amber-600 bg-amber-50 p-2 rounded-lg">
                  💡 أضف منتجات بقيمة {formatPrice(1000 - subtotal)} إضافية للحصول على شحن مجاني!
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-sm">
                <span className="font-black text-gray-900">المجموع الكلي:</span>
                <span className="text-xl font-black text-brand-red">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-6 rounded-xl font-black text-sm bg-brand-red hover:bg-brand-darkRed text-white flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition transform active:scale-98"
            >
              <span>متابعة إتمام الطلب</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                دفع آمن ومحمي
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-brand-red" />
                توصيل سريع
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

