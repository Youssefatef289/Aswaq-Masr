import React, { useState, useMemo } from 'react';
import { Search, Users, Trash2 } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatDate } from '../../utils/formatters';

const ROLE_LABELS = {
  customer: 'عميل',
  manager: 'مدير',
  admin: 'مشرف'
};

export const AdminCustomers = () => {
  const { profiles, orders, updateUserRole, deleteUser } = useAdminData();
  const { user: currentUser, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Real customer stats derived from the orders table (grouped by phone)
  const orderStatsByPhone = useMemo(() => {
    const stats = {};
    orders.forEach((o) => {
      const key = (o.phone || '').trim();
      if (!key) return;
      const entry = stats[key] || (stats[key] = { ordersCount: 0, totalSpent: 0, lastOrder: null });
      entry.ordersCount += 1;
      entry.totalSpent += Number(o.total) || 0;
      if (!entry.lastOrder || (o.date && new Date(o.date) > new Date(entry.lastOrder))) {
        entry.lastOrder = o.date;
      }
    });
    return stats;
  }, [orders]);

  const customers = useMemo(() => {
    const list = (profiles || [])
      .filter((p) => p.role !== 'admin')
      .map((p) => {
        const stat = orderStatsByPhone[(p.phone || '').trim()] || { ordersCount: 0, totalSpent: 0, lastOrder: null };
        return {
          id: p.id,
          name: p.fullName || p.name || 'مستخدم',
          phone: p.phone || '—',
          email: p.email || '',
          governorate: p.governorate || '—',
          city: p.city || '',
          role: p.role || 'customer',
          ordersCount: stat.ordersCount,
          totalSpent: stat.totalSpent,
          lastOrder: stat.lastOrder
        };
      });

    const query = searchTerm.toLowerCase().trim();
    return list
      .filter((c) => {
        const matchesSearch =
          !query ||
          c.name.toLowerCase().includes(query) ||
          c.phone.includes(query) ||
          c.city?.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query);
        const matchesRole = roleFilter === 'all' || c.role === roleFilter;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0));
  }, [profiles, orders, orderStatsByPhone, searchTerm, roleFilter]);

  const handleRoleChange = async (userId, role) => {
    await updateUserRole(userId, role);
  };

  const handleDelete = async (customer) => {
    if (currentUser?.id === customer.id) return;
    if (!window.confirm(`هل تريد حذف حساب ${customer.name} نهائياً؟`)) return;
    await deleteUser(customer.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            قائمة العملاء المسجلين ({customers.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            سجل بيانات المشتركين الحقيقي من قاعدة البيانات، عدد الطلبات، وإجمالي المشتريات
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="max-w-md relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="بحث باسم العميل، الهاتف، البريد، أو المنطقة..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-xs focus:outline-none focus:border-brand-red"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-red cursor-pointer"
          >
            <option value="all">كل الأدوار</option>
            <option value="customer">عملاء</option>
            <option value="manager">مديرون</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <th className="p-4 font-bold">اسم العميل</th>
                <th className="p-4 font-bold">رقم الهاتف</th>
                <th className="p-4 font-bold">المحافظة</th>
                <th className="p-4 font-bold">عدد الطلبات</th>
                <th className="p-4 font-bold">إجمالي الإنفاق</th>
                <th className="p-4 font-bold">آخر طلب</th>
                <th className="p-4 font-bold">الصلاحية</th>
                <th className="p-4 font-bold">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/70 transition">
                  <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-brand-red font-black flex items-center justify-center shrink-0">
                      {customer.name.charAt(0)}
                    </div>
                    <span className="truncate max-w-[160px]">{customer.name}</span>
                  </td>
                  <td className="p-4 font-mono text-gray-600">{customer.phone}</td>
                  <td className="p-4 text-gray-500">{customer.governorate}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[11px]">
                      {customer.ordersCount} طلبات
                    </span>
                  </td>
                  <td className="p-4 font-black text-brand-red font-mono">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="p-4 text-gray-500 font-mono">
                    {customer.lastOrder ? formatDate(customer.lastOrder) : '—'}
                  </td>
                  <td className="p-4">
                    {isAdmin && currentUser?.id !== customer.id ? (
                      <select
                        value={customer.role}
                        onChange={(e) => handleRoleChange(customer.id, e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[10px] focus:outline-none cursor-pointer"
                      >
                        <option value="customer">عميل</option>
                        <option value="manager">مدير</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        customer.role === 'manager' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {ROLE_LABELS[customer.role] || customer.role}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {isAdmin && currentUser?.id !== customer.id && (
                      <button
                        type="button"
                        onClick={() => handleDelete(customer)}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                        title="حذف العميل"
                        aria-label={`حذف ${customer.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {customers.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs font-bold">لا يوجد عملاء مسجلون بعد</p>
                    <p className="text-[11px] text-gray-400 mt-1">تظهر البيانات الحقيقية من Supabase فور تسجيل أول حساب.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};