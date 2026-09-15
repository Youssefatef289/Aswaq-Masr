import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, User, Menu, X, PhoneCall, 
  MapPin, ShieldCheck, Truck, Sparkles, ChevronDown, 
  Layers, Tag, Award, LogOut, LayoutDashboard
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useAdminData } from '../../context/AdminDataContext';
import { formatPrice } from '../../utils/formatters';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemsCount, grandTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { categories, products } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSearchCat, setSelectedSearchCat] = useState('all');

  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle live search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase().trim();
      const filtered = products.filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(query) ||
          p.brandName.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query);
        const matchesCategory =
          selectedSearchCat === 'all' || p.categoryId === selectedSearchCat;
        return matchesQuery && matchesCategory;
      });
      setSearchResults(filtered.slice(0, 6));
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, selectedSearchCat, products]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}${selectedSearchCat !== 'all' ? `&category=${selectedSearchCat}` : ''}`);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white z-50 transition-all duration-200">
      {/* Top Bar */}
      <div className="bg-[#171717] text-white text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Truck className="w-3.5 h-3.5" />
              <span>توصيل مجاني للطلبات أكثر من 1000 ج.م لجميع المحافظات</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span>منتجات أصلية 100% ومضمونة</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span className="font-semibold text-white">الخط الساخن: 19888</span>
            </div>
            <span className="text-gray-600">|</span>
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-red-400 hover:text-red-300 bg-red-950/60 px-2 py-0.5 rounded font-bold border border-red-800/60 transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>لوحة التحكم الإدارية</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`w-full bg-white border-b border-gray-100 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-sticky-nav z-50 py-2.5 animate-in fade-in slide-in-from-top-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 bg-brand-red rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white stroke-none">
                <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
                <circle cx="12" cy="14" r="2.5"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-brand-black flex items-center gap-1">
                <span>أسواق</span>
                <span className="text-brand-red">مصر</span>
              </span>
              <span className="text-[11px] text-gray-500 font-medium -mt-1 hidden sm:block">
                كل ما تحتاجه بأفضل سعر
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center rounded-xl border-2 border-brand-red/30 focus-within:border-brand-red bg-gray-50 focus-within:bg-white transition-all shadow-sm">
              {/* Category Select inside Search */}
              <select
                value={selectedSearchCat}
                onChange={(e) => setSelectedSearchCat(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 py-3 px-3 border-l border-gray-200 focus:outline-none cursor-pointer max-w-[140px] truncate"
              >
                <option value="all">كل الأقسام</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
                placeholder="ابحث عن منتج، براند أو قسم..."
                className="w-full bg-transparent py-2.5 px-4 text-sm text-gray-800 focus:outline-none placeholder:text-gray-400 font-medium"
              />

              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-darkRed text-white px-5 py-3 rounded-l-[10px] font-bold text-sm flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>بحث</span>
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 max-h-[420px] overflow-y-auto">
                <div className="text-xs font-bold text-gray-400 px-3 py-1 mb-1">
                  نتائج البحث ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2.5 hover:bg-red-50/50 rounded-lg transition-colors group"
                      >
                        <img
                          src={item.images?.[0] || item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-100 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-brand-red font-bold">{item.brandName}</p>
                          <h4 className="text-sm font-semibold text-gray-800 truncate group-hover:text-brand-red">
                            {item.name}
                          </h4>
                          <span className="text-xs text-gray-500">{item.categoryName}</span>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-sm font-bold text-brand-red">
                            {formatPrice(item.price)}
                          </span>
                          {item.oldPrice && (
                            <span className="block text-[11px] text-gray-400 line-through">
                              {formatPrice(item.oldPrice)}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                    <div className="pt-2">
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full text-center py-2 text-xs font-bold text-brand-red hover:bg-brand-lightRed rounded-lg transition"
                      >
                        عرض جميع النتائج لـ "{searchQuery}"
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <p className="text-sm font-medium">لم نجد أي منتجات تطابق "{searchQuery}"</p>
                    <p className="text-xs text-gray-400 mt-1">جرب كلمات أخرى مثل: أرز، حليب، أريال، زيت...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* User Account Menu */}
            <div ref={userMenuRef} className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-brand-red"
                  />
                  <div className="hidden xl:flex flex-col text-right">
                    <span className="text-xs text-gray-500">أهلاً بك</span>
                    <span className="text-xs font-bold text-gray-900 max-w-[90px] truncate">
                      {user.name}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden xl:block" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-brand-red p-2 rounded-xl hover:bg-red-50 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="hidden xl:flex flex-col text-right">
                    <span className="text-[11px] text-gray-400 font-medium">تسجيل الدخول</span>
                    <span className="text-xs font-bold text-gray-800">حسابي</span>
                  </div>
                </Link>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && isAuthenticated && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">مسجل الدخول كـ</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-brand-red hover:bg-red-50 transition"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>لوحة التحكم الإدارية</span>
                    </Link>
                  )}
                  <Link
                    to="/track-order"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span>تتبع طلباتي</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span>قائمة المفضلة ({wishlistCount})</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition border-t border-gray-100 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl text-gray-700 hover:text-brand-red hover:bg-red-50 transition hidden sm:flex items-center justify-center"
              title="المفضلة"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="flex items-center gap-2 bg-brand-lightRed text-brand-red hover:bg-brand-red hover:text-white px-3 sm:px-4 py-2 rounded-xl font-bold transition-all group"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -left-2 bg-brand-red group-hover:bg-white text-white group-hover:text-brand-red text-[11px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-right">
                <span className="text-[10px] text-gray-500 group-hover:text-red-100">سلة التسوق</span>
                <span className="text-xs font-black">{formatPrice(grandTotal)}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Row (When on mobile) */}
        <div className="px-4 pt-2.5 pb-1 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن المنتجات، الماركات..."
              className="w-full bg-gray-100 rounded-xl py-2.5 pr-10 pl-4 text-xs font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-red"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5" />
            <button
              type="submit"
              className="absolute left-1.5 bg-brand-red text-white text-[11px] px-3 py-1.5 rounded-lg font-bold"
            >
              بحث
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                isActive('/')
                  ? 'border-brand-red text-brand-red bg-red-50/50'
                  : 'border-transparent text-gray-700 hover:text-brand-red hover:bg-gray-50'
              }`}
            >
              الرئيسية
            </Link>
            <Link
              to="/categories"
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                isActive('/categories')
                  ? 'border-brand-red text-brand-red bg-red-50/50'
                  : 'border-transparent text-gray-700 hover:text-brand-red hover:bg-gray-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>جميع الأقسام</span>
            </Link>
            <Link
              to="/products"
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                isActive('/products')
                  ? 'border-brand-red text-brand-red bg-red-50/50'
                  : 'border-transparent text-gray-700 hover:text-brand-red hover:bg-gray-50'
              }`}
            >
              كل المنتجات
            </Link>
            <Link
              to="/brands"
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                isActive('/brands')
                  ? 'border-brand-red text-brand-red bg-red-50/50'
                  : 'border-transparent text-gray-700 hover:text-brand-red hover:bg-gray-50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>البراندات</span>
            </Link>
            <Link
              to="/offers"
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-bold border-b-2 transition-colors text-brand-red relative ${
                isActive('/offers') ? 'border-brand-red bg-red-50/50' : 'border-transparent hover:bg-red-50/40'
              }`}
            >
              <Tag className="w-4 h-4 animate-bounce" />
              <span>عروض اليوم الحصرية</span>
              <span className="bg-brand-red text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
                خصومات
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 py-2">
            <Link
              to="/track-order"
              className="text-xs font-bold text-gray-600 hover:text-brand-red flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-gray-100 transition"
            >
              <Truck className="w-4 h-4 text-brand-red" />
              <span>متابعة حالة الطلب</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

