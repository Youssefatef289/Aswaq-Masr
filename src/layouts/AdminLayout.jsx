import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Layers, Award, Tag, 
  ShoppingBag, Users, Settings, ArrowRight, Menu, X, 
  Store, Bell, LogOut, ChevronLeft 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdminData } from '../context/AdminDataContext';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { orders } = useAdminData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  const navItems = [
    { to: '/admin', label: 'لوحة الإحصائيات', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'إدارة المنتجات', icon: Package },
    { to: '/admin/categories', label: 'إدارة الأقسام', icon: Layers },
    { to: '/admin/brands', label: 'إدارة البراندات', icon: Award },
    { to: '/admin/offers', label: 'إدارة العروض', icon: Tag },
    { to: '/admin/orders', label: 'إدارة الطلبات', icon: ShoppingBag, badge: pendingOrdersCount },
    { to: '/admin/customers', label: 'قائمة العملاء', icon: Users },
    { to: '/admin/settings', label: 'إعدادات المتجر', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row text-gray-800">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#171717] text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-lg bg-gray-800 text-gray-300 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm">لوحة تحكم أسواق مصر</span>
        </div>
        <Link
          to="/"
          className="text-xs bg-brand-red text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
        >
          <Store className="w-3.5 h-3.5" />
          <span>المتجر</span>
        </Link>
      </div>

      {/* Sidebar Backdrop on Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 right-0 h-screen w-64 bg-[#171717] text-white flex flex-col justify-between z-50 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Admin Branding */}
          <div className="p-5 border-b border-gray-800 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-red rounded-xl flex items-center justify-center font-black shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
                </svg>
              </div>
              <div>
                <span className="font-black text-base text-white block">
                  أسواق <span className="text-brand-red">مصر</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold block -mt-0.5">لوحة الإدارة</span>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-red text-white shadow-md'
                        : 'text-gray-400 hover:bg-gray-800/80 hover:text-gray-100'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="bg-amber-400 text-black text-[10px] font-black px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Return to Store */}
        <div className="p-4 border-t border-gray-800 bg-[#121212]">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white rounded-xl text-xs font-bold transition mb-3"
          >
            <Store className="w-4 h-4 text-brand-red" />
            <span>العودة للمتجر</span>
            <ChevronLeft className="w-3.5 h-3.5 mr-auto" />
          </Link>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800/80">
            <div className="flex items-center gap-2 truncate">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt="admin"
                className="w-7 h-7 rounded-full object-cover border border-brand-red"
              />
              <span className="font-semibold text-gray-200 truncate">{user?.name || 'المدير'}</span>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-gray-400 hover:text-red-400 p-1"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex bg-white border-b border-gray-200 px-6 py-3.5 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">لوحة التحكم</span>
            <span className="text-gray-300">/</span>
            <span className="text-xs font-bold text-gray-800">إدارة منصة أسواق مصر</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-brand-darkRed bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
            >
              <Store className="w-3.5 h-3.5" />
              <span>معاينة المتجر المباشر</span>
            </Link>

            <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600">المتجر متصل ونشط</span>
            </div>
          </div>
        </header>

        {/* Outlet Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

