import React, { useState, useMemo } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Package, X, 
  Check, Filter, AlertCircle, Eye 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { formatPrice } from '../../utils/formatters';

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, categories, brands } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brandId: '',
    brandName: '',
    categoryId: '',
    categoryName: '',
    price: '',
    oldPrice: '',
    discount: '',
    stock: '',
    sku: '',
    description: '',
    image: '',
    isFeatured: false,
    isBestSeller: false
  });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.brandName?.toLowerCase().includes(query) ||
        p.sku?.toLowerCase().includes(query);

      const matchesCat = selectedCat === 'all' || p.categoryId === selectedCat;
      return matchesSearch && matchesCat;
    });
  }, [products, searchTerm, selectedCat]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brandId: brands[0]?.id || '',
      brandName: brands[0]?.name || '',
      categoryId: categories[0]?.id || '',
      categoryName: categories[0]?.name || '',
      price: '',
      oldPrice: '',
      discount: '',
      stock: 50,
      sku: 'ASM-' + Math.floor(1000 + Math.random() * 9000),
      description: '',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      isFeatured: false,
      isBestSeller: false
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brandId: product.brandId,
      brandName: product.brandName,
      categoryId: product.categoryId,
      categoryName: product.categoryName,
      price: product.price,
      oldPrice: product.oldPrice || '',
      discount: product.discount || '',
      stock: product.stock ?? 50,
      sku: product.sku || '',
      description: product.description || '',
      image: product.images?.[0] || product.image || '',
      isFeatured: !!product.isFeatured,
      isBestSeller: !!product.isBestSeller
    });
    setIsModalOpen(true);
  };

  const handleBrandChange = (brandId) => {
    const brand = brands.find((b) => b.id === brandId);
    setFormData((prev) => ({
      ...prev,
      brandId,
      brandName: brand?.name || ''
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    setFormData((prev) => ({
      ...prev,
      categoryId,
      categoryName: cat?.name || ''
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      discount: formData.discount ? Number(formData.discount) : 0,
      stock: Number(formData.stock),
      images: [formData.image]
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف المنتج "${name}"؟`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            إدارة المنتجات ({products.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            إضافة وتعديل وحذف المنتجات وضبط الأسعار والمخزون
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-brand-red hover:bg-brand-darkRed text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث بالاسم، البراند أو SKU..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-xs focus:outline-none focus:border-brand-red"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 shrink-0">القسم:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="all">كل الأقسام</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <th className="p-4 font-bold">المنتج</th>
                <th className="p-4 font-bold">البراند</th>
                <th className="p-4 font-bold">القسم</th>
                <th className="p-4 font-bold">السعر</th>
                <th className="p-4 font-bold">المخزون</th>
                <th className="p-4 font-bold">كود SKU</th>
                <th className="p-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <img
                        src={p.images?.[0] || p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100 shrink-0"
                      />
                      <span className="font-bold text-gray-900 line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-gray-600">{p.brandName}</td>
                  <td className="p-4 text-gray-500">{p.categoryName}</td>
                  <td className="p-4">
                    <span className="font-bold text-brand-red font-mono">{formatPrice(p.price)}</span>
                    {p.oldPrice && (
                      <span className="block text-[10px] text-gray-400 line-through">
                        {formatPrice(p.oldPrice)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      (p.stock ?? 10) > 10
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {p.stock ?? 10} قطعة
                    </span>
                  </td>
                  <td className="p-4 font-mono text-gray-500">{p.sku || 'N/A'}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                        title="تعديل المنتج"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-black text-gray-900">
                {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد لأسواق مصر'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">اسم المنتج</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">البراند / الماركة</label>
                  <select
                    value={formData.brandId}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">القسم الرئيسي</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">السعر الحالي (ج.م)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">السعر القديم قبل الخصم</label>
                  <input
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">الكمية في المخزن</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">كود SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">رابط صورة المنتج (URL)</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">وصف المنتج</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-brand-red"
                  />
                  <span>عرض في المميزة</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="accent-brand-red"
                  />
                  <span>الأكثر مبيعاً</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-red hover:bg-brand-darkRed text-white font-bold shadow-md"
                >
                  {editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

