import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tag, X, ExternalLink } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const AdminOffers = () => {
  const { offers, addOffer, updateOffer, deleteOffer } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    tag: '',
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    link: '/products',
    buttonText: 'تسوق العرض الآن',
    badge: 'عرض خاص'
  });

  const openAddModal = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      subtitle: '',
      tag: 'خصم يصل إلى 30%',
      bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
      link: '/products',
      buttonText: 'تسوق العرض الآن',
      badge: 'عرض خاص'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      subtitle: offer.subtitle || '',
      tag: offer.tag || '',
      bannerImage: offer.bannerImage || '',
      link: offer.link || '/products',
      buttonText: offer.buttonText || 'تسوق الآن',
      badge: offer.badge || 'عرض خاص'
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingOffer) {
      updateOffer(editingOffer.id, formData);
    } else {
      addOffer(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`هل أنت متأكد من حذف العرض "${title}"؟`)) {
      deleteOffer(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            إدارة العروض والبانرات ({offers.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            إضافة وتعديل البانرات والحملات الترويجية والخصومات الموسمية
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-darkRed text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء عرض جديد</span>
        </button>
      </div>

      {/* Offers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-[1200/400] w-full bg-gray-900 overflow-hidden">
              <img
                src={offer.bannerImage}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 bg-brand-red text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                {offer.tag}
              </div>
              <div className="absolute bottom-3 right-3 left-3 text-white">
                <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded font-bold">
                  {offer.badge}
                </span>
                <h3 className="text-base font-black mt-1 drop-shadow-sm">{offer.title}</h3>
              </div>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-gray-600 leading-relaxed">{offer.subtitle}</p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">{offer.link}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(offer)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="تعديل العرض"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id, offer.title)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="حذف العرض"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-black text-gray-900">
                {editingOffer ? 'تعديل العرض الترويجي' : 'إنشاء عرض جديد'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">عنوان العرض</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: مهرجان الألبان والتوفير"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">الوصف الفرعي</label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">شارة الخصم (Tag)</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="خصم 30%"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">نوع الشارة (Badge)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="عرض الأسبوع"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">رابط بانر العرض (1200x400)</label>
                <input
                  type="url"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">رابط التوجيه (Link)</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">نص الزر (CTA)</label>
                  <input
                    type="text"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-red hover:bg-brand-darkRed text-white font-bold rounded-xl shadow-md"
                >
                  حفظ العرض
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

