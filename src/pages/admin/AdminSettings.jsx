import React, { useState } from 'react';
import { Settings, Save, Store, Phone, MessageSquare, MapPin, Truck, CreditCard } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const AdminSettings = () => {
  const { settings, updateSettings } = useAdminData();

  const [formData, setFormData] = useState({ ...settings });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({
      ...formData,
      freeShippingMin: Number(formData.freeShippingMin),
      defaultDeliveryFee: Number(formData.defaultDeliveryFee),
      taxRate: Number(formData.taxRate),
      whatsappGovernorates: (formData.whatsappGovernoratesText ?? (formData.whatsappGovernorates || []).join(','))
        .split(/[،,]/)
        .map((value) => value.trim())
        .filter(Boolean),
      socialLinks: {
        ...(formData.socialLinks || {}),
        facebook: formData.facebook || '',
        instagram: formData.instagram || '',
        tiktok: formData.tiktok || ''
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            إعدادات المتجر العامة
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            تخصيص بيانات وهوية منصة أسواق مصر وسياسات التوصيل والدفع
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        
        {/* 1. Basic Store Info */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Store className="w-4 h-4 text-brand-red" />
            <span>بيانات المتجر الأساسية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">اسم المتجر</label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">الشعار النصي (Tagline)</label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">رقم الخط الساخن / الهاتف</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">رقم الواتساب لخدمة العملاء</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-gray-700 mb-1">العنوان الرئيسي</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red" />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">المحافظات المسموح لها بتأكيد واتساب</label>
              <input
                type="text"
                name="whatsappGovernoratesText"
                value={formData.whatsappGovernoratesText ?? (formData.whatsappGovernorates || []).join('، ')}
                onChange={handleChange}
                placeholder="بني سويف، القاهرة"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">رابط فيسبوك</label>
              <input type="url" name="facebook" value={formData.facebook || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red" />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">رابط إنستجرام</label>
              <input type="url" name="instagram" value={formData.instagram || ''} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red" />
            </div>
          </div>
        </div>

        {/* 2. Shipping & Delivery Rules */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Truck className="w-4 h-4 text-brand-red" />
            <span>سياسات الشحن والتوصيل</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                الحد الأدنى للشحن المجاني (ج.م)
              </label>
              <input
                type="number"
                name="freeShippingMin"
                value={formData.freeShippingMin}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red font-mono"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                أي طلب يتخطى هذا المبلغ يحصل العميل على شحن مجاني تلقائياً.
              </span>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                تكلفة الشحن الافتراضية (ج.م)
              </label>
              <input
                type="number"
                name="defaultDeliveryFee"
                value={formData.defaultDeliveryFee}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red font-mono"
              />
            </div>
          </div>
        </div>

        {/* 3. Payment Methods */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <CreditCard className="w-4 h-4 text-brand-red" />
            <span>طرق الدفع المسموح بها</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="enableCod"
                checked={formData.enableCod}
                onChange={handleChange}
                className="w-4 h-4 accent-brand-red"
              />
              <span className="font-bold text-gray-800">الدفع نقداً عند الاستلام (COD)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="enableCard"
                checked={formData.enableCard}
                onChange={handleChange}
                className="w-4 h-4 accent-brand-red"
              />
              <span className="font-bold text-gray-800">الدفع الإلكتروني (بطاقات بنكية ومحافظ ذكية)</span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-red hover:bg-brand-darkRed text-white font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-red-500/20 transition transform active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>حفظ وتحديث الإعدادات</span>
          </button>
        </div>
      </form>
    </div>
  );
};

