import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, User, Menu, X, PhoneCall, 
  MapPin, ShieldCheck, Truck, Sparkles, ChevronDown, 
  Layers, Tag, Award, LogOut, LayoutDashboard, MessageCircle 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useAdminData } from '../../context/AdminDataContext';
import { formatPrice } from '../../utils/formatters';

export const Header = ({ onOpenCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItemsCount, grandTotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { categories, brands, products, settings } = useAdminData();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [relatedBrands, setRelatedBrands] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  // Advanced Multi-Tree Search Engine (Products, Categories & Related Brands)
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase().trim();

      // 1. Matching Products
      const matchedProducts = products.filter((p) => {
        const matchesQuery =
          p.name.toLowerCase().includes(query) ||
          p.brandName?.toLowerCase().includes(query) ||
          p.categoryName?.toLowerCase().includes(query) ||
          (query === 'زبادي' && (p.name.includes('زبادي') || p.categoryId === 'dairy-eggs'));

        const matchesCategory =
          selectedSearchCat === 'all' || p.categoryId === selectedSearchCat;

        return matchesQuery && matchesCategory;
      });

      setSearchResults(matchedProducts.slice(0, 6));

      // 2. Related Brands (Direct matching or brands of matched products)
      const brandIdsFromMatchedProducts = new Set(matchedProducts.map((p) => p.brandId));
      const matchedDirectBrands = brands.filter((b) =>
        b.name.toLowerCase().includes(query) ||
        b.nameEn?.toLowerCase().includes(query) ||
        brandIdsFromMatchedProducts.has(b.id) ||
        (query === 'زبادي' && (b.id === 'juhayna' || b.name.includes('جهينة')))
      );

      setRelatedBrands(matchedDirectBrands.slice(0, 4));
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setRelatedBrands([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, selectedSearchCat, products, brands]);

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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white z-50 transition-all duration-200">
      {/* Top Bar */}
      <div className="bg-[#171717] text-white text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>خدمة وتوصيل حصري لمحافظة بني سويف وضواحيها 🚚</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-gray-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span>شحن مجاني للطلبات أكثر من {settings?.freeShippingMin || 500} ج.م</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <a
              href={`https://wa.me/${(settings?.whatsapp || '201012345678').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
              <span>واتساب: {settings?.whatsapp || '01012345678'}</span>
            </a>
            <span className="text-gray-600 hidden sm:inline">|</span>
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-amber-300 hover:text-amber-200 bg-red-950/80 px-2.5 py-0.5 rounded font-bold border border-red-700/60 transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>لوحة التحكم (Admin)</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div
        className={`w-full bg-white border-b border-gray-100 transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 right-0 shadow-sticky-nav z-50 py-2.5 animate-in fade-in slide-in-from-top-2' : 'py-3.5 sm:py-4'
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
              <span className="text-[11px] text-gray-500 font-bold -mt-1 hidden sm:block">
                سوبرماركت بني سويف الأول
              </span>
            </div>
          </Link>

          {/* Search Bar Desktop */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center rounded-xl border-2 border-brand-red/30 focus-within:border-brand-red bg-gray-50 focus-within:bg-white transition-all shadow-sm">
              <select
                value={selectedSearchCat}
                onChange={(e) => setSelectedSearchCat(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-700 py-3 px-3 border-l border-gray-200 focus:outline-none cursor-pointer max-w-[140px] truncate"
              >
                <option value="all">كل الأقسام</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setIsSearchOpen(true)}
                placeholder="ابحث عن زبادي، حليب، أرز، براند أو قسم..."
                className="w-full bg-transparent py-2.5 px-4 text-xs sm:text-sm text-gray-800 focus:outline-none placeholder:text-gray-400 font-medium"
              />

              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-darkRed text-white px-5 py-3 rounded-l-[10px] font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>بحث</span>
              </button>
            </form>

            {/* Live Search Suggestions Dropdown with Products and Related Brands */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 max-h-[460px] overflow-y-auto space-y-3">
                
                {/* Related Brands Section */}
                {relatedBrands.length > 0 && (
                  <div className="pb-2 border-b border-gray-100">
                    <span className="text-[11px] font-bold text-gray-400 block mb-2">
                      ماركات وبراندات ذات صلة بـ "{searchQuery}":
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {relatedBrands.map((brand) => (
                        <Link
                          key={brand.id}
                          to={`/brand/${brand.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-brand-red py-1 px-3 rounded-full text-xs font-bold border border-brand-red/20 transition group"
                        >
                          <Award className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          <span>{brand.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Products */}
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-2">
                    المنتجات المطابقة ({searchResults.length}):
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 p-2 hover:bg-red-50/50 rounded-xl transition group"
                        >
                          <img
                            src={item.images?.[0] || item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-contain bg-gray-50 border border-gray-100 shrink-0 group-hover:scale-105 transition"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] text-brand-red font-bold block">{item.brandName}</span>
                            <h4 className="text-xs font-bold text-gray-800 truncate group-hover:text-brand-red">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-gray-400">{item.categoryName}</span>
                          </div>
                          <div className="text-left shrink-0">
                            <span className="text-xs font-black text-brand-red">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                        </Link>
                      ))}

                      <div className="pt-2">
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full text-center py-2 text-xs font-bold text-brand-red hover:bg-brand-lightRed rounded-xl transition"
                        >
                          عرض جميع نتائج البحث لـ "{searchQuery}" ←
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p className="text-xs font-bold">لم نجد منتجات تطابق "{searchQuery}"</p>
                      <p className="text-[11px] text-gray-400 mt-1">جرب كلمات أخرى مثل: زبادي، حليب، أريال، زيت...</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions: Account, Wishlist, Slide-over Cart Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Account */}
            <div ref={userMenuRef} className="relative">
              {isAuthenticated ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-brand-red"
                  />
                  <div className="hidden xl:flex flex-col text-right">
                    <span className="text-[10px] text-gray-400 font-bold">أهلاً بك</span>
                    <span className="text-xs font-bold text-gray-900 max-w-[90px] truncate">{user.name}</span>
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
                    <span className="text-[10px] text-gray-400 font-bold">تسجيل الدخول</span>
                    <span className="text-xs font-bold text-gray-800">حسابي</span>
                  </div>
                </Link>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && isAuthenticated && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in duration-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-[11px] text-gray-400 font-bold">مسجل كـ</p>
                    <p className="text-xs font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-500 font-mono truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-brand-red hover:bg-red-50 transition"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>لوحة التحكم الإدارية</span>
                    </Link>
                  )}
                  <Link
                    to="/track-order"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span>تتبع طلباتي</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span>قائمة المفضلة ({wishlistCount})</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition border-t border-gray-100 mt-1"
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
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Slide-over Cart Button (Triggers Drawer) */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-brand-lightRed text-brand-red hover:bg-brand-red hover:text-white px-3 sm:px-4 py-2 rounded-xl font-bold transition-all group"
              title="عرض سلة التسوق"
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
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="px-4 pt-2.5 pb-1 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن زبادي، حليب، أرز، ماركات..."
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

      {/* Navigation Bar Desktop */}
      <nav className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                isActive('/') ? 'border-brand-red text-brand-red bg-red-50/50' : 'border-transparent text-gray-700 hover:text-brand-red'
              }`}
            >
              الرئيسية
            </Link>
            <Link
              to="/categories"
              className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                isActive('/categories') ? 'border-brand-red text-brand-red bg-red-50/50' : 'border-transparent text-gray-700 hover:text-brand-red'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>جميع الأقسام</span>
            </Link>
            <Link
              to="/products"
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                isActive('/products') ? 'border-brand-red text-brand-red bg-red-50/50' : 'border-transparent text-gray-700 hover:text-brand-red'
              }`}
            >
              كل المنتجات
            </Link>
            <Link
              to="/brands"
              className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                isActive('/brands') ? 'border-brand-red text-brand-red bg-red-50/50' : 'border-transparent text-gray-700 hover:text-brand-red'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>البراندات</span>
            </Link>
            <Link
              to="/offers"
              className={`flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition text-brand-red ${
                isActive('/offers') ? 'border-brand-red bg-red-50/50' : 'border-transparent hover:bg-red-50/40'
              }`}
            >
              <Tag className="w-4 h-4 animate-bounce" />
              <span>عروض اليوم</span>
              <span className="bg-brand-red text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
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
