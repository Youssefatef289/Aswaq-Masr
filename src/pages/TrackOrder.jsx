import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, CheckCircle2, Clock, PackageCheck, 
  Truck, Home, Phone, MapPin, Calendar, AlertCircle 
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useAdminData } from '../context/AdminDataContext';
import { formatPrice, formatDate } from '../utils/formatters';

const steps = [
  { id: 'confirmed', label: 'تم تأكيد الطلب', desc: 'تم استلام وتأكيد بيانات الطلب بنجاح', icon: CheckCircle2 },
  { id: 'preparing', label: 'جاري تجهيز الطلب', desc: 'يتم فحص وتغليف المنتجات في المخزن', icon: PackageCheck },
  { id: 'out-for-delivery', label: 'في الطريق للتسليم', desc: 'الشحنة مع مندوب التوصيل في منطقتك', icon: Truck },
  { id: 'delivered', label: 'تم التوصيل بنجاح', desc: 'تم تسليم الطلب للعميل', icon: Home }
];

export const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useAdminData();
  const initialOrderId = searchParams.get('id') || 'ASM-10892';

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState(() => {
    return orders.find((o) => o.id === initialOrderId) || orders[0] || null;
  });

  const handleSearchOrder = (e) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      const found = orders.find(
        (o) => o.id.toLowerCase() === orderQuery.trim().toLowerCase()
      );
      setCurrentOrder(found || null);
    }
  };

  const getStepIndex = (status) => {
    if (status === 'pending' || status === 'confirmed') return 0;
    if (status === 'preparing') return 1;
    if (status === 'out-for-delivery') return 2;
    if (status === 'delivered') return 3;
    return 0;
  };

  const currentStepIndex = currentOrder ? getStepIndex(currentOrder.status) : 0;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'متابعة وتتبع الطلب' }]} />

      {/* Search Order Bar */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-4 text-center">
        <div className="w-12 h-12 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mx-auto">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            تتبع مسار شحنتك المباشر
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            أدخل رقم الطلب المرسل إليك لمتابعة حالة التوصيل لحظة بلحظة
          </p>
        </div>

        <form onSubmit={handleSearchOrder} className="flex gap-2">
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="مثال: ASM-10892"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono uppercase focus:outline-none focus:border-brand-red focus:bg-white"
          />
          <button
            type="submit"
            className="bg-brand-red hover:bg-brand-darkRed text-white px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>تتبع</span>
          </button>
        </form>
      </div>

      {/* Order Status Display */}
      {currentOrder ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-sm space-y-8 max-w-4xl mx-auto">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold">رقم الطلب:</span>
                <span className="text-lg font-black text-brand-red font-mono">{currentOrder.id}</span>
                <span className="bg-red-50 text-brand-red text-[11px] font-bold px-2 py-0.5 rounded-md">
                  {currentOrder.statusLabel}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                تاريخ الطلب: {formatDate(currentOrder.date)}
              </p>
            </div>

            <div className="text-right sm:text-left">
              <span className="text-xs text-gray-400 block">الإجمالي المطلوب:</span>
              <span className="text-xl font-black text-gray-900 font-mono">
                {formatPrice(currentOrder.total)}
              </span>
            </div>
          </div>

          {/* Timeline with 80x80 Icons */}
          <div className="relative py-4">
            {/* Desktop Stepper */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.id} className="flex flex-col items-center text-center space-y-3">
                    {/* 80x80 Icon Container */}
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                        isCurrent
                          ? 'bg-brand-red text-white scale-105 ring-4 ring-red-100 border-2 border-white'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      <Icon className="w-10 h-10" />
                    </div>

                    <div>
                      <h4
                        className={`text-xs sm:text-sm font-black ${
                          isCurrent
                            ? 'text-brand-red'
                            : isCompleted
                            ? 'text-emerald-700'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1 max-w-[160px] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Items Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100 text-xs">
            <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
              <h3 className="font-black text-gray-900 flex items-center gap-1.5 text-sm">
                <MapPin className="w-4 h-4 text-brand-red" />
                <span>بيانات الشحن والمستلم</span>
              </h3>
              <p><strong>اسم العميل:</strong> {currentOrder.customerName}</p>
              <p><strong>رقم الهاتف:</strong> {currentOrder.phone}</p>
              <p><strong>المحافظة والمدينة:</strong> {currentOrder.governorate}، {currentOrder.city}</p>
              <p><strong>العنوان:</strong> {currentOrder.address}</p>
              <p><strong>طريقة الدفع:</strong> {currentOrder.paymentMethod}</p>
            </div>

            <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
              <h3 className="font-black text-gray-900 flex items-center gap-1.5 text-sm">
                <Truck className="w-4 h-4 text-brand-red" />
                <span>المنتجات في الشحنة</span>
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {currentOrder.items?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-gray-200/60 last:border-0">
                    <span className="text-gray-700 truncate max-w-[200px]">{item.name} × {item.quantity}</span>
                    <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto space-y-3">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h3 className="text-base font-bold text-gray-800">لم يتم العثور على طلب بهذا الرقم</h3>
          <p className="text-xs text-gray-500">
            تأكد من كتابة رقم الطلب بالشكل الصحيح أو تواصل مع خدمة العملاء على 19888.
          </p>
        </div>
      )}
    </div>
  );
};

