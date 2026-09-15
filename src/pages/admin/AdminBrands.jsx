import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Award, X } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const AdminBrands = () => {
  const { brands, addBrand, updateBrand, deleteBrand, products } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    logo: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=300&q=80',
    description: ''
  });

  const openAddModal = () => {
    setEditingBrand(null);
    setFormData({
      name: '',
      nameEn: '',
      logo: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=300&q=80',
      description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      nameEn: brand.nameEn || '',
      logo: brand.logo || '',
      description: brand.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingBrand) {
      updateBrand(editingBrand.id, formData);
    } else {
      addBrand({
        ...formData,
        id: formData.nameEn ? formData.nameEn.toLowerCase().replace(/\s+/g, '-') : 'brand-' + Date.now()
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`هل أنت متأكد من حذف براند "${name}"؟`)) {
      deleteBrand(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            إدارة البراندات والماركات ({brands.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            إضافة وتعديل العلامات التجارية والشركات المصنعة والشعارات
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-darkRed text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة ماركة جديدة</span>
        </button>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {brands.map((brand) => {
          const productCount = products.filter((p) => p.brandId === brand.id).length;

          return (
            <div
              key={brand.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-card transition-all flex flex-col items-center text-center justify-between"
            >
              <div className="w-24 h-24 rounded-2xl bg-gray-50 p-2 flex items-center justify-center border border-gray-100 mb-3">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-sm">{brand.name}</h3>
                <span className="text-[11px] text-gray-400 font-semibold block mt-0.5">
                  {productCount || brand.productCount || 0} منتجات مرتبطة
                </span>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 w-full flex items-center justify-center gap-2">
                <button
                  onClick={() => openEditModal(brand)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="تعديل"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(brand.id, brand.name)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-black text-gray-900">
                {editingBrand ? 'تعديل البراند' : 'إضافة ماركة جديدة'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">اسم البراند بالعربية</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: جهينة"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">اسم البراند بالإنجليزية</label>
                <input
                  type="text"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="Juhayna"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">رابط الشعار Logo (200x200)</label>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">نبذة عن البراند</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
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
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

