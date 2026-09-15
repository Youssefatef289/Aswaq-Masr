import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Layers, X, ArrowLeft } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1400&q=80'
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      coverImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1400&q=80'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug || category.id,
      description: category.description || '',
      image: category.image || '',
      coverImage: category.coverImage || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory({
        ...formData,
        id: formData.slug.toLowerCase().replace(/\s+/g, '-') || 'cat-' + Date.now()
      });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`هل أنت متأكد من حذف قسم "${name}"؟`)) {
      deleteCategory(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            إدارة الأقسام ({categories.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            إضافة وتعديل أقسام المتجر والصور الرئيسية والفرعية
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-darkRed text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة قسم جديد</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const productCount = products.filter((p) => p.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/2] w-full bg-gray-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  {productCount || cat.productCount || 0} منتج مرتبط
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-gray-900 text-sm">{cat.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400">/{cat.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="تعديل"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-black text-gray-900">
                {editingCategory ? 'تعديل القسم' : 'إضافة قسم جديد'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">اسم القسم</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مواد غذائية"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">رابط القسم بالإنجليزية (Slug)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="food-cupboard"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-mono focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">رابط صورة القسم (300x300)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-red"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">وصف القسم</label>
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

