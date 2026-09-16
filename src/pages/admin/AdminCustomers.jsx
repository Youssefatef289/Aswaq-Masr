import React, { useState } from 'react';
import { Users, Search, Phone, ShoppingBag, DollarSign, Calendar } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const initialCustomers = [
  { id: 'c1', name: 'أحمد محمود حسن', phone: '01012345678', governorate: 'بني سويف', city: 'بني سويف - شارع عبد السلام عارف', ordersCount: 5, totalSpent: 3850, lastOrder: '2026-09-14' },
  { id: 'c2', name: 'سارة عبد الله خالد', phone: '01198765432', governorate: 'بني سويف', city: 'الواسطى - الميدان الرئيسي', ordersCount: 3, totalSpent: 2150, lastOrder: '2026-09-13' },
  { id: 'c3', name: 'محمد طارق فاروق', phone: '01234567890', governorate: 'بني سويف', city: 'شرق النيل - بني سويف الجديدة', ordersCount: 2, totalSpent: 2440, lastOrder: '2026-09-15' },
  { id: 'c4', name: 'منى إبراهيم السيد', phone: '01055566778', governorate: 'بني سويف', city: 'ببا - شارع المحطة', ordersCount: 7, totalSpent: 5900, lastOrder: '2026-09-10' },
  { id: 'c5', name: 'يوسف مصطفى الجندي', phone: '01099887766', governorate: 'بني سويف', city: 'إهناسيا - بجوار مجلس المدينة', ordersCount: 4, totalSpent: 4100, lastOrder: '2026-09-12' },
  { id: 'c6', name: 'نورا سامي عثمان', phone: '01511223344', governorate: 'بني سويف', city: 'الفشن - شارع بورسعيد', ordersCount: 1, totalSpent: 850, lastOrder: '2026-09-08' }
];

export const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = initialCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            قائمة العملاء المسجلين ({initialCustomers.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            سجل بيانات المشترين في نطاق محافظة بني سويف، عدد الطلبات، وإجمالي المشتريات
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
        <div className="max-w-md relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث باسم العميل، الهاتف، أو المنطقة..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-xs focus:outline-none focus:border-brand-red"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
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
                <th className="p-4 font-bold">المنطقة والمدينة</th>
                <th className="p-4 font-bold">عدد الطلبات</th>
                <th className="p-4 font-bold">إجمالي الإنفاق</th>
                <th className="p-4 font-bold">تاريخ آخر طلب</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/70 transition">
                  <td className="p-4 font-bold text-gray-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-50 text-brand-red font-black flex items-center justify-center shrink-0">
                      {customer.name.charAt(0)}
                    </div>
                    <span>{customer.name}</span>
                  </td>
                  <td className="p-4 font-mono text-gray-600">{customer.phone}</td>
                  <td className="p-4 text-gray-600 font-medium">{customer.city}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[11px]">
                      {customer.ordersCount} طلبات
                    </span>
                  </td>
                  <td className="p-4 font-black text-brand-red font-mono">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="p-4 text-gray-500 font-mono">{customer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
