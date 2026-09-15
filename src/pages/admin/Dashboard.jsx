import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, ShoppingBag, Package, Users, DollarSign, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, 
  AlertCircle, ChevronLeft, Eye, Plus 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { formatPrice, formatDate } from '../../utils/formatters';

export const Dashboard = () => {
  const { products, categories, orders } = useAdminData();

  const totalSales = orders.reduce((acc, order) => acc + (order.total || 0), 0) + 48250;
  const totalOrdersCount = orders.length + 84;
  const totalProductsCount = products.length;
  const totalCustomersCount = 152;

  const recentOrders = orders.slice(0, 5);
  const topProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            لوحة الإحصائيات العامة للمتجر
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            متابعة المبيعات المباشرة، حركة الطلبات، ونشاط المنتجات في أسواق مصر
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="bg-brand-red hover:bg-brand-darkRed text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج جديد</span>
          </Link>
        </div>
      </div>

      {/* 4 Statistics Cards (Icons: 40x40) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Total Sales */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 block mb-1">إجمالي المبيعات</span>
            <span className="text-xl font-black text-gray-900 block font-mono">{formatPrice(totalSales)}</span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% هذا الشهر</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 block mb-1">إجمالي الطلبات</span>
            <span className="text-xl font-black text-gray-900 block font-mono">{totalOrdersCount} طلب</span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.1% نمو أسبوعي</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 block mb-1">المنتجات النشطة</span>
            <span className="text-xl font-black text-gray-900 block font-mono">{totalProductsCount} صنف</span>
            <span className="text-[11px] text-gray-400 font-semibold block mt-1">في {categories.length} أقسام رئيسية</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 block mb-1">إجمالي العملاء</span>
            <span className="text-xl font-black text-gray-900 block font-mono">{totalCustomersCount} عميل</span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+9 عملاء جدد اليوم</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section (600x300) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Chart Widget */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-gray-900">
                مخطط المبيعات الأسبوعية (Sales Chart)
              </h2>
              <span className="text-xs text-gray-400">إجمالي الأداء خلال آخر 7 أيام</span>
            </div>
            <span className="text-xs font-black text-brand-red bg-red-50 px-2.5 py-1 rounded-lg">
              السبت - الجمعة
            </span>
          </div>

          {/* SVG Visual Chart */}
          <div className="h-64 w-full flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2 px-2 border-b border-gray-100">
            {[
              { day: 'السبت', value: 75, amount: '7,500 ج.م' },
              { day: 'الأحد', value: 60, amount: '6,000 ج.م' },
              { day: 'الإثنين', value: 90, amount: '9,000 ج.م' },
              { day: 'الثلاثاء', value: 80, amount: '8,000 ج.م' },
              { day: 'الأربعاء', value: 95, amount: '9,500 ج.م' },
              { day: 'الخميس', value: 100, amount: '12,400 ج.م' },
              { day: 'الجمعة', value: 85, amount: '8,500 ج.م' }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip on hover */}
                <div className="absolute -top-10 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20">
                  {col.amount}
                </div>
                <div
                  style={{ height: `${col.value}%` }}
                  className="w-full bg-gradient-to-t from-brand-red/70 to-brand-red rounded-t-xl group-hover:from-brand-darkRed group-hover:to-brand-red transition-all duration-300"
                />
                <span className="text-[11px] font-bold text-gray-500">{col.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Distribution Widget */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm sm:text-base font-black text-gray-900">
              حالات الطلبات (Orders Status)
            </h2>
            <span className="text-xs text-gray-400">توزيع الطلبات الحالية</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'تم التوصيل بنجاح', count: 68, color: 'bg-emerald-500', percent: '65%' },
              { label: 'في الطريق للتسليم', count: 18, color: 'bg-blue-500', percent: '18%' },
              { label: 'جاري التجهيز', count: 12, color: 'bg-amber-500', percent: '12%' },
              { label: 'قيد الانتظار', count: 5, color: 'bg-red-500', percent: '5%' }
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-700">{item.label}</span>
                  <span className="font-mono text-gray-500">{item.count} ({item.percent})</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div style={{ width: item.percent }} className={`h-full ${item.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm sm:text-base font-black text-gray-900">
              أحدث الطلبات الواردة (Recent Orders)
            </h2>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>عرض كل الطلبات</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  <th className="pb-3 font-bold">رقم الطلب</th>
                  <th className="pb-3 font-bold">العميل</th>
                  <th className="pb-3 font-bold">المحافظة</th>
                  <th className="pb-3 font-bold">المبلغ</th>
                  <th className="pb-3 font-bold">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-3 font-bold font-mono text-brand-red">{order.id}</td>
                    <td className="py-3 font-semibold text-gray-800">{order.customerName}</td>
                    <td className="py-3 text-gray-500">{order.governorate}</td>
                    <td className="py-3 font-bold text-gray-900">{formatPrice(order.total)}</td>
                    <td className="py-3">
                      <span className="bg-red-50 text-brand-red px-2 py-0.5 rounded font-bold text-[10px]">
                        {order.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="text-sm sm:text-base font-black text-gray-900">
              الأكثر مبيعاً (Top Products)
            </h2>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-brand-red hover:underline"
            >
              المنتجات
            </Link>
          </div>

          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition">
                <img
                  src={p.images?.[0] || p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-gray-800 truncate">{p.name}</h4>
                  <span className="text-[11px] text-gray-400 font-semibold">{p.brandName}</span>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-xs font-black text-brand-red block">{formatPrice(p.price)}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">مخزون: {p.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

