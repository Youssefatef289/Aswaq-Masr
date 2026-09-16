import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Search, Filter, Eye, CheckCircle2, 
  Clock, Truck, Package, XCircle, ChevronDown, MapPin, Phone, User, 
  Printer, Download, FileSpreadsheet 
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { formatPrice, formatDate } from '../../utils/formatters';

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useAdminData();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const statuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'pending', label: 'قيد الانتظار (Pending)', color: 'bg-amber-50 text-amber-800' },
    { value: 'confirmed', label: 'تم التأكيد (Confirmed)', color: 'bg-blue-50 text-blue-800' },
    { value: 'preparing', label: 'جاري التجهيز (Preparing)', color: 'bg-purple-50 text-purple-800' },
    { value: 'out-for-delivery', label: 'في الطريق (Out for Delivery)', color: 'bg-indigo-50 text-indigo-800' },
    { value: 'delivered', label: 'تم التوصيل (Delivered)', color: 'bg-emerald-50 text-emerald-800' },
    { value: 'cancelled', label: 'ملغي (Cancelled)', color: 'bg-red-50 text-red-800' }
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        o.id.toLowerCase().includes(query) ||
        o.customerName?.toLowerCase().includes(query) ||
        o.phone?.includes(query);

      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'out-for-delivery':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'preparing':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['رقم الطلب', 'اسم العميل', 'رقم الهاتف', 'المركز/المدينة', 'العنوان', 'المبلغ الإجمالي', 'الحالة', 'التاريخ'];
    const rows = filteredOrders.map(o => [
      o.id,
      `"${o.customerName}"`,
      `"${o.phone}"`,
      `"${o.city || ''}"`,
      `"${o.address || ''}"`,
      o.total,
      o.statusLabel || o.status,
      o.date
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aswaaq_Masr_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            إدارة الطلبات والمبيعات ({orders.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            متابعة حالة شحن الطلبات وتحديثها ومراجعة فواتير وبيانات العملاء في بني سويف
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>تصدير الطلبات (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="بحث برقم الطلب، اسم العميل أو الهاتف..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-xs focus:outline-none focus:border-brand-red"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-400 shrink-0">تصفية الحالة:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          >
            {statuses.map((st) => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <th className="p-4 font-bold">رقم الطلب</th>
                <th className="p-4 font-bold">العميل والهاتف</th>
                <th className="p-4 font-bold">المركز والمدينة</th>
                <th className="p-4 font-bold">الأصناف</th>
                <th className="p-4 font-bold">طريقة الدفع</th>
                <th className="p-4 font-bold">المبلغ الكلي</th>
                <th className="p-4 font-bold">حالة الطلب (تغيير فوري)</th>
                <th className="p-4 font-bold text-center">التفاصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/70 transition">
                  <td className="p-4 font-bold font-mono text-brand-red">
                    {ord.id}
                    <span className="block text-[10px] text-gray-400 font-normal">
                      {formatDate(ord.date)}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-gray-900 block">{ord.customerName}</span>
                    <span className="text-[11px] text-gray-500 font-mono">{ord.phone}</span>
                  </td>

                  <td className="p-4 text-gray-600">
                    <span className="font-semibold block">{ord.city || 'بني سويف'}</span>
                    <span className="text-[11px] text-gray-400 truncate max-w-[120px] block">{ord.address}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-gray-800">
                      {ord.items?.length || 1} منتج
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">{ord.paymentMethod}</td>

                  <td className="p-4 font-black text-brand-red font-mono">
                    {formatPrice(ord.total)}
                  </td>

                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                      className={`text-[11px] font-bold py-1.5 px-2.5 rounded-xl border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                        ord.status
                      )}`}
                    >
                      <option value="pending">قيد الانتظار (Pending)</option>
                      <option value="confirmed">تم التأكيد (Confirmed)</option>
                      <option value="preparing">جاري التجهيز (Preparing)</option>
                      <option value="out-for-delivery">في الطريق للتسليم</option>
                      <option value="delivered">تم التوصيل بنجاح</option>
                      <option value="cancelled">تم الإلغاء (Cancelled)</option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelectedOrderDetails(ord)}
                      className="p-1.5 text-brand-red hover:bg-red-50 rounded-lg transition"
                      title="عرض تفاصيل الفاتورة"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto print:max-w-none print:shadow-none">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-black text-gray-900">
                  تفاصيل الفاتورة - {selectedOrderDetails.id}
                </h2>
                <span className="text-xs text-gray-400">
                  تاريخ الطلب: {formatDate(selectedOrderDetails.date)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintInvoice}
                  className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-xl font-bold transition"
                  title="طباعة الفاتورة"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة</span>
                </button>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1.5">
                <p><strong>العميل:</strong> {selectedOrderDetails.customerName}</p>
                <p><strong>رقم الهاتف:</strong> {selectedOrderDetails.phone}</p>
                <p><strong>المنطقة والعنوان:</strong> {selectedOrderDetails.city} - {selectedOrderDetails.address}</p>
                {selectedOrderDetails.notes && (
                  <p><strong>ملاحظات:</strong> {selectedOrderDetails.notes}</p>
                )}
                <p><strong>طريقة الدفع:</strong> {selectedOrderDetails.paymentMethod}</p>
                <p><strong>حالة الطلب:</strong> {selectedOrderDetails.statusLabel || selectedOrderDetails.status}</p>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-gray-800 mb-2">الأصناف المطلوبة:</h4>
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
                  {selectedOrderDetails.items?.map((item, i) => (
                    <div key={i} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
                        )}
                        <span>{item.name} × {item.quantity}</span>
                      </div>
                      <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="bg-red-50/50 p-3.5 rounded-2xl border border-brand-red/20 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>{formatPrice(selectedOrderDetails.subtotal || selectedOrderDetails.total)}</span>
                </div>
                {selectedOrderDetails.shippingCost !== undefined && (
                  <div className="flex justify-between">
                    <span>مصاريف التوصيل:</span>
                    <span>{formatPrice(selectedOrderDetails.shippingCost)}</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-sm text-brand-red pt-2 border-t border-brand-red/20">
                  <span>الإجمالي المستحق:</span>
                  <span>{formatPrice(selectedOrderDetails.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
