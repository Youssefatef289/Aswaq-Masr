import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'قائمة المفضلة' }]} />

        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-lg mx-auto space-y-4 my-8 shadow-sm">
          <div className="w-20 h-20 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black text-gray-900">قائمة المفضلة فارغة</h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            لم تقم بحفظ أي منتجات في قائمتك المفضلة حتى الآن. اضغط على رمز القلب عند أي منتج لحفظه والعودة إليه لاحقاً.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-darkRed text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
            >
              <span>تصفح المنتجات وأضف للمفضلة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'قائمة المفضلة' }]} />

      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-brand-red fill-brand-red" />
          <h1 className="text-xl sm:text-2xl font-black text-gray-900">
            قائمة المفضلة ({wishlistItems.length} منتجات)
          </h1>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>مسح الكل</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-brand-red p-3 sm:p-4 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden mb-3 p-2 flex items-center justify-center">
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-2 left-2 z-10 w-7 h-7 rounded-full bg-white text-gray-400 hover:text-red-600 shadow-sm flex items-center justify-center transition"
                title="حذف من المفضلة"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <Link to={`/product/${item.id}`} className="w-full h-full flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </Link>
            </div>

            <div className="space-y-2 flex-1 flex flex-col justify-between">
              <div>
                {item.brandName && (
                  <span className="text-[10px] font-bold text-gray-400 block">
                    {item.brandName}
                  </span>
                )}
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-800 hover:text-brand-red line-clamp-2 leading-snug">
                    {item.name}
                  </h3>
                </Link>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm sm:text-base font-black text-brand-red">
                    {formatPrice(item.price)}
                  </span>
                  {item.oldPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(item.oldPrice)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-brand-red hover:bg-brand-darkRed text-white flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>نقل إلى السلة</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

